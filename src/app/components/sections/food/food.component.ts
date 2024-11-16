import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this.sectionId.set(4);
  }  
}
