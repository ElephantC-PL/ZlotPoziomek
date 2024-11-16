import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this.sectionId.set(6);
  }  
}