import { Component, HostBinding, inject } from '@angular/core';
import { DataService, SectionData } from '../../services/data.service';
import { SectionWrapperDirective } from './section-wrapper.directive';
import { HasPropertyPipe } from '../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';

@Component({
  selector: 'app-base-section',
  standalone: true,
  imports: [SectionWrapperDirective, SectionLayoutComponent, HasPropertyPipe],
  templateUrl: './base-section.component.html',
  styleUrl: './base-section.component.scss'
})
export class BaseSectionComponent {
  private _data = inject(DataService);
  public data:SectionData = {};  

  protected async _initData(sectionId: number ): Promise<void> {
    this.data = await this._data.getSectionData(sectionId);   
  }
}
