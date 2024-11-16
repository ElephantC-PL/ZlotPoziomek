import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { DataService, SectionData } from '../../services/data.service';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';
import { ApiUrl } from '../../settings';
import { ImageValue, FileValue, RichTextValue } from '../../models/db-data.model';

export interface dataToDisplay {
  string: string[],
  image: ImageValue[],
  richText: RichTextValue[],
  file: FileValue[]
}

@Component({
  selector: 'app-base-section',
  standalone: true,
  imports: [SectionLayoutComponent],
  templateUrl: './base-section.component.html',
  styleUrl: './base-section.component.scss'
})
export class BaseSectionComponent {
  private _data = inject(DataService);
  private _apiUrl = ApiUrl; 
  public imgPath: string = `${this._apiUrl}/img/`; 
  protected sectionId: WritableSignal<number> = signal(0);

  protected data: Signal<dataToDisplay> = computed(()=>{
    const result: dataToDisplay = {
      string: [],
      image: [],
      richText: [],
      file: []
    }
    if(this.sectionId() !== 0){
      const data = this._data.allData()[this.sectionId()];      
      if(data){
        data.forEach((x, i) => {
          const image = x as ImageValue;
          if(image.width && image.height && image.fileName && image.alt){
            result.image[i] = image;
            return
          } 
          const file = x as FileValue; 
          if(file.fileName && file.linkText){
            result.file[i] = file;
            return
          } 
          const richText = x as RichTextValue; 
          if(typeof richText === 'object'){ 
            result.richText[i] = richText;
            return
          }
          const string = x as string; 
          if(typeof string === 'string'){
            result.string[i] = string;
            return
          }
        })  
      }        
    }
    return result;
  });
}
