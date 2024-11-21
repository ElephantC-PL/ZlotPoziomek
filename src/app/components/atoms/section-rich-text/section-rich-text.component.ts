import { Component, Input } from '@angular/core';
import { RichTextValue } from '../../../services/db-data.service';
import { QuillViewComponent } from 'ngx-quill';
import { QuillLinksRedirectPipe } from './quill-links-redirect.pipe';

@Component({
  selector: 'app-section-rich-text',
  standalone: true,
  imports: [QuillViewComponent, QuillLinksRedirectPipe],
  templateUrl: './section-rich-text.component.html',
  styleUrl: './section-rich-text.component.scss'
})
export class SectionRichTextComponent {
  @Input({required: true}) data!: RichTextValue;
}
