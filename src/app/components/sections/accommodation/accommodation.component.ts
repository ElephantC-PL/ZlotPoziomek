import { Component } from '@angular/core';
import { BaseSectionComponent } from '../../base-section/base-section.component';
import { HasPropertyPipe } from '../../../pipes/has-property.pipe';

@Component({
  selector: 'app-accommodation',
  standalone: true,
  imports: [HasPropertyPipe],
  templateUrl: './accommodation.component.html',
  styleUrl: './accommodation.component.scss'
})
export class AccommodationComponent extends BaseSectionComponent {  
  constructor(){
    super()    
    this._initData(3);
  }  
}