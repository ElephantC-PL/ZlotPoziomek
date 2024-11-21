import { Component, computed, inject, Input, Signal } from '@angular/core';
import { ContentStore } from '../../../stores/content.store';
import { RichTextValue, ImageValue, FileValue } from '../../../services/db-data.service';
import { SectionType } from '../../pages/specific-edition-page';
import { NormalSectionComponent } from '../../molecules/normal-section/normal-section.component';
import { BannerComponent } from '../../molecules/banner/banner.component';

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
  imports: [ NormalSectionComponent, BannerComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  readonly store = inject(ContentStore);  
  @Input({required: true}) sectionId: number = 0;  
  @Input() sectionType?: SectionType = SectionType.Normal;  

  data: Signal<SectionValuesToDisplay|undefined> = computed(()=> {      
    return this.store.contentValuesToDisplayMap().get(this.sectionId)
  })
}
