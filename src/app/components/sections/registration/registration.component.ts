import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent,],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(7);
  }  
}