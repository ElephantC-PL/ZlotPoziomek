import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-t-shirts',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './t-shirts.component.html',
  styleUrl: './t-shirts.component.scss'
})
export class TShirtsComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(8);
  }  
}
