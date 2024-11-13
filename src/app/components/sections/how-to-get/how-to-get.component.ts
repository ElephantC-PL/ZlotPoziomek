import { Component } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-how-to-get',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './how-to-get.component.html',
  styleUrl: './how-to-get.component.scss'
})
export class HowToGetComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(2);
  }
}
