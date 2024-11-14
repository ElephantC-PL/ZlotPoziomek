import { Component, inject } from '@angular/core';
import { DataService, SectionData } from '../../services/data.service';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';
import { ApiUrl } from '../../settings';
import { ImageValue, FileValue } from '../../models/db-data.model';

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
  public data: SectionData[] = [];  
  public image: ImageValue[] = [];  
  public file: FileValue[] = []; 
  public text?: string;
  public bg?: string;
  public imgPath: string = `${this._apiUrl}/img/`

  protected async _initData(sectionId: number ): Promise<void> {
    this.data = await this._data.getSectionData(sectionId);  
    this.text = this.data[3] as string;
    this.bg = this.data[2] as string;

    this.data = this.data.map((x, i) => {
      const image = x as unknown as ImageValue; 
      if(image.width && image.height && image.fileName && image.alt){
        this.image[i] = image;
      } 
      const file = x as unknown as FileValue; 
      if(file.fileName && file.linkText ){
        this.file[i] = file;
      } 
      return x   
    })
  } 
}
