import { Component, Input } from '@angular/core';
import { SectionValuesToDisplay, initSectionValuesToDisplay } from '../../organisms/section/section.component';
import { API_URL } from '../../../settings';
import { SectionImageComponent } from "../../atoms/section-image/section-image.component";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SectionImageComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  @Input({required: true}) data: SectionValuesToDisplay = initSectionValuesToDisplay; 
  imgPath: string = `${API_URL}/img/`;   
}
