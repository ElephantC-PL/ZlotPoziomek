import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-contack',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent,],
  templateUrl: './contack.component.html',
  styleUrl: './contack.component.scss'
})
export class ContackComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(9);
  }  
}
