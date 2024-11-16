import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this.sectionId.set(7);
  }  
}