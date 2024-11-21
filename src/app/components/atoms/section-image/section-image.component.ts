import { Component, Input } from '@angular/core';
import { ImageValue } from '../../../services/db-data.service';
import { API_URL } from '../../../settings';

@Component({
  selector: 'app-section-image',
  standalone: true,
  imports: [],
  templateUrl: './section-image.component.html',
  styleUrl: './section-image.component.scss'
})
export class SectionImageComponent {
  @Input({required: true}) data!: ImageValue;
  imgPath: string = `${API_URL}/img/`;   
}
