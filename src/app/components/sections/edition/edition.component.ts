import { Component } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-edition',
  standalone: true,
  imports: [SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './edition.component.html',
  styleUrl: './edition.component.scss', 
})
export class EditionComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(1);
  }  
}
