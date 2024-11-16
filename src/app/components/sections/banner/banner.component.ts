import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent,],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    //this.sectionId.set();
  }  
}