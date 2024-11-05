import { Component } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';

@Component({
  selector: 'app-edition',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent ],
  templateUrl: './edition.component.html',
  styleUrl: './edition.component.scss', 
})
export class EditionComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(1);
  }  
}
