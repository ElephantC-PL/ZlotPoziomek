import { Component, HostBinding } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { SectionWrapperDirective } from '../../base-section/section-wrapper.directive';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-edition',
  standalone: true,
  imports: [HasPropertyPipe],
  templateUrl: './edition.component.html',
  styleUrl: './edition.component.scss', 
})
export class EditionComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(1);
  }  
}
