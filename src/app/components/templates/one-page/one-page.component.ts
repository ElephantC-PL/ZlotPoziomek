import { Component, Input } from '@angular/core';
import { Page } from '../../../models/page.model';
import { HeaderComponent } from '../../organisms/header/header.component';
import { SectionComponent } from '../../organisms/section/section.component';

@Component({
  selector: 'app-one-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SectionComponent
  ],
  templateUrl: './one-page.component.html',
  styleUrl: './one-page.component.scss'
})
export class OnePageComponent {
  @Input() page?: Page;
}
