import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ContentType, Content } from '../models/db-data.model';
import { DbDataService } from './db-data.service';
import { ArrayOfArrays } from '../models/app.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {  
  private _dbComponents = inject(DbDataService);
  public variants = [1,2,3,4,5,6,7,8,9].reverse();
  public currentVariant = 9;
  public allData: WritableSignal<ArrayOfArrays> = signal({});
  public isPreview = false;

  public changeVariant(variantId: number):void{
    this.currentVariant = variantId;  
    this.getData();
  }

  private _mapMultiVersion(
    data: Content[],
    statusIds: number[]
  ): ArrayOfArrays { 
    const filteredData = data.filter(item => statusIds.includes(item.statusId)); 
    filteredData.sort((a, b) => statusIds.indexOf(a.statusId) - statusIds.indexOf(b.statusId));    
    const result: ArrayOfArrays = {};  
    filteredData.forEach(item => {
      if(item.type && item.value){   
        if (!result[item.sectionId]) {
          result[item.sectionId] = []; 
        }    
        if (!result[item.sectionId][item.locationId]) {
          result[item.sectionId][item.locationId] = {type: item.type, value: item.value};
        }
      }
    });  
    return result ?? [];
  }

  private _mapOneVersion(
    data: Content[],
    statusId: number
  ): ArrayOfArrays {
    const filteredData = data.filter(item => item.statusId === statusId);
    const result: ArrayOfArrays = {};
    filteredData.forEach(item => {
      if(item.type && item.value){   
        if (!result[item.sectionId]) {
          result[item.sectionId] = []; 
        }    
        result[item.sectionId][item.locationId] = {type: item.type, value: item.value};
      }
    });
    return result;
  }

  public async getData(): Promise<void>{    
    const types = [ContentType.SimpleText, ContentType.Color, ContentType.RichText, ContentType.Image, ContentType.File];
    const versions = this.isPreview ? [2,3] : [3];
    const sections = [1,2,3,4,5,6,7,8,9,10];
     
    const dbData = await this._dbComponents.getAllData(types, sections, versions, [this.currentVariant])
    
    if(dbData){
      const data = this.isPreview ? this._mapMultiVersion(dbData, [2,3]) : this._mapOneVersion(dbData, 3)
      this.allData.set(data);     
    }   
  }  
}
