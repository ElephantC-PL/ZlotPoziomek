import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-t-shirts',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent,],
  templateUrl: './t-shirts.component.html',
  styleUrl: './t-shirts.component.scss'
})
export class TShirtsComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(8);
  }  
}
