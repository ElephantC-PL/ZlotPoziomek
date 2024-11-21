import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../organisms/header/header.component';
import { SectionComponent } from '../../organisms/section/section.component';
import { Page } from '../../pages/specific-edition-page';
import { BannerComponent } from '../../molecules/banner/banner.component';

@Component({
  selector: 'app-one-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SectionComponent,
    BannerComponent
  ],
  templateUrl: './one-page.component.html',
  styleUrl: './one-page.component.scss'
})
export class OnePageComponent {
  @Input() page?: Page;
}
