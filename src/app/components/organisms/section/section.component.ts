import { Component, computed, inject, Input, signal, Signal, WritableSignal } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ImageValue, FileValue, RichTextValue, ContentType } from '../../../models/db-data.model';
import { ApiUrl } from '../../../settings';
import { sectionDataToDisplay } from '../../../models/app.model';
import { SectionLayoutComponent } from '../../molecules/section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input() name: string = '';
  @Input({required: true}) sectionId: number = 0; 

  private _data = inject(DataService);
  private _apiUrl = ApiUrl; 
  public imgPath: string = `${this._apiUrl}/img/`;  

  protected data: Signal<sectionDataToDisplay> = computed(()=>{
    const result: sectionDataToDisplay = {
      string: [],
      image: [],
      richText: [],
      file: []
    }
    if(this.sectionId !== 0){
      const data = this._data.allData()[this.sectionId];      
      if(data){
        data.forEach((x, i) => {
          switch(x.type){
            case ContentType.Image:
              result.image[i] = x.value as ImageValue;
              break;
            case ContentType.RichText:
              result.richText[i] = x.value as RichTextValue;
              break;            
            case ContentType.File:
              result.file[i] = x.value as FileValue;
              break;
            default: 
              result.string[i] = x.value as string;
          }         
        })  
      }        
    }
    return result;
  });
}
