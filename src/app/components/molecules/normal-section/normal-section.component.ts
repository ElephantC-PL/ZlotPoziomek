import { Component, Input } from '@angular/core';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';
import { initSectionValuesToDisplay, SectionValuesToDisplay } from '../../organisms/section/section.component';
import { SectionHeaderComponent } from "../../atoms/section-header/section-header.component";
import { SectionImageComponent } from '../../atoms/section-image/section-image.component';
import { SectionRichTextComponent } from '../../atoms/section-rich-text/section-rich-text.component';

@Component({
  selector: 'app-normal-section',
  standalone: true,
  imports: [SectionLayoutComponent, SectionHeaderComponent, SectionImageComponent, SectionRichTextComponent],
  templateUrl: './normal-section.component.html',
  styleUrl: './normal-section.component.scss'
})
export class NormalSectionComponent {
  @Input({required: true}) data: SectionValuesToDisplay = initSectionValuesToDisplay;  
}
