import { Component, computed, inject, Input, Signal } from '@angular/core';
import { API_URL } from '../../../settings';
import { SectionLayoutComponent } from '../../molecules/section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';
import { ContentStore } from '../../../stores/content.store';
import { RichTextValue, ImageValue, FileValue } from '../../../services/db-data.service';

export interface SectionValuesToDisplay {
  string: string[],
  richText: RichTextValue[],
  image: ImageValue[],
  file: FileValue[]
}

export const initSectionValuesToDisplay = {
  string: [],
  image: [],
  richText: [],
  file: []
}

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  readonly store = inject(ContentStore);
  @Input() sectionName: string = '';
  @Input({required: true}) sectionId: number = 0;   
  imgPath: string = `${API_URL}/img/`;  

  data: Signal<SectionValuesToDisplay> = computed(()=> {    
    // console.log('this.sectionId', this.sectionId)
    // console.log('contentValuesToDisplayMap', this.store.contentValuesToDisplayMap())
    return this.store.contentValuesToDisplayMap().get(this.sectionId) ?? initSectionValuesToDisplay
  })  
}
