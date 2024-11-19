import { Component, computed, inject, Input, Signal } from '@angular/core';
import { ApiUrl } from '../../../settings';
import { SectionLayoutComponent } from '../../molecules/section-layout/section-layout.component';
import { QuillViewComponent } from 'ngx-quill';
import { ContentStore, SectionValuesToDisplay } from '../../../stores/content.store';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [SectionLayoutComponent, QuillViewComponent ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  readonly store = inject(ContentStore);
  @Input() name: string = '';
  @Input({required: true}) sectionId: number = 0;   
  imgPath: string = `${ApiUrl}/img/`;  
  

  data: Signal<SectionValuesToDisplay> = computed(()=> 
    this.store.contentValuesToDisplayMap().get(this.sectionId) ?? {
      string: [],
      image: [],
      richText: [],
      file: []
    }
  )  
}
