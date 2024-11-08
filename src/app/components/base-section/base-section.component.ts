import { Component, inject } from '@angular/core';
import { DataService, SectionData } from '../../services/data.service';
import { HasPropertyPipe } from '../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';

@Component({
  selector: 'app-base-section',
  standalone: true,
  imports: [SectionLayoutComponent, HasPropertyPipe],
  templateUrl: './base-section.component.html',
  styleUrl: './base-section.component.scss'
})
export class BaseSectionComponent {
  private _data = inject(DataService);
  public data:SectionData = {};  
  public text?: string;
  public bg?: string;

  protected async _initData(sectionId: number ): Promise<void> {
    this.data = await this._data.getSectionData(sectionId);  
    this.text = this.data['text-color'] as string;
    this.bg = this.data['bg-color'] as string;   
  }
}
