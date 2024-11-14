import { Component, inject } from '@angular/core';
import { DataService, SectionData } from '../../services/data.service';
import { HasPropertyPipe } from '../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';
import { ApiUrl } from '../../settings';
import { ImageValue } from '../../models/db-data.model';

@Component({
  selector: 'app-base-section',
  standalone: true,
  imports: [SectionLayoutComponent, HasPropertyPipe],
  templateUrl: './base-section.component.html',
  styleUrl: './base-section.component.scss'
})
export class BaseSectionComponent {
  private _data = inject(DataService);
  private _apiUrl = ApiUrl;
  public data: SectionData[] = [];  
  public image: ImageValue[] = [];  
  public text?: string;
  public bg?: string;
  public imgPath: string = `${this._apiUrl}/img/`

  protected async _initData(sectionId: number ): Promise<void> {
    this.data = await this._data.getSectionData(sectionId);  
    this.text = this.data[3] as string;
    this.bg = this.data[2] as string;

    this.data = this.data.map((x, i) => {
      const image =  x as unknown as ImageValue; 
      if(image.width && image.height && image.fileName && image.alt){
        this.image[i] = image;
      } 
      return x   
    })
  } 
}
