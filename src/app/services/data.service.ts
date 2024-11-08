import { inject, Injectable } from '@angular/core';
import { ContentType, Content } from '../models/db-data.model';
import { Subject } from 'rxjs';
import { DbDataService } from './db-data.service';

export interface ArrayOfArrays { 
  [sectionId: number]: { [location: string]: string | object | undefined }
}

export interface SectionData {
  [location: string]: string | object | undefined; 
}

@Injectable({
  providedIn: 'root'
})
export class DataService {  
  private _dbComponents = inject(DbDataService); 
  public data: ArrayOfArrays = {}; 
  private _loadedFromDb = new Subject<void>();

  private _mapMultiVersion(
    data: Content[],
    versionIds: number[]
  ): ArrayOfArrays { 
    const filteredData = data.filter(item => versionIds.includes(item.versionId)); 
    filteredData.sort((a, b) => versionIds.indexOf(a.versionId) - versionIds.indexOf(b.versionId));    
    const result: { [sectionId: number]: { [location: string]: string |object | undefined } } = {};  
    filteredData.forEach(item => {
      if (!result[item.sectionId]) {
        result[item.sectionId] = {}; 
      }    
      if (!result[item.sectionId][item.location]) {
        result[item.sectionId][item.location] = item.value;
      }
    });  
    return result;
  }

  private _mapOneVersion(
    data: Content[],
    versionId: number
  ): ArrayOfArrays {
    const filteredData = data.filter(item => item.versionId === versionId);
    const result: { [sectionId: number]: { [location: string]: string | object | undefined } } = {};
    filteredData.forEach(item => {
      if (!result[item.sectionId]) {
        result[item.sectionId] = {}; 
      }
      result[item.sectionId][item.location] = item.value;
    });
    return result;
  }

  public async getData(isPreview: boolean): Promise<void>{    
    const types = [ContentType.SimpleText, ContentType.Color, ContentType.RichText];
    const versions = isPreview ? [2,3] : [3];
    const sections = [1,2,3,4,5,6,7,8,9,10];
     
    const dbData = await this._dbComponents.getAllData(types, sections, versions)
    
    if(dbData){
      const data = isPreview ? this._mapMultiVersion(dbData, [2,3]) : this._mapOneVersion(dbData, 3)
      this.data = data;    
      this._loadedFromDb.next();  
    }   
  }  

  public getSectionData(sectionId: number): Promise<SectionData>{       
    return new Promise<SectionData>((resolve) => {      
      this._loadedFromDb.subscribe({
        next: () => {         
          return resolve(this.data[sectionId])}        
      });
    });
  }
}
