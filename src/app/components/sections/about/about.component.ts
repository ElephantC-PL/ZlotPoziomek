import { Component } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(10);
  }  
}