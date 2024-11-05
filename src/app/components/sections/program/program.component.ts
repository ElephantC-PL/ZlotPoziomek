import { Component } from '@angular/core';
import { SectionLayoutComponent } from '../../section-layout/section-layout.component';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [HasPropertyPipe, SectionLayoutComponent,],
  templateUrl: './program.component.html',
  styleUrl: './program.component.scss'
})
export class ProgramComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(5);
  }  
}
