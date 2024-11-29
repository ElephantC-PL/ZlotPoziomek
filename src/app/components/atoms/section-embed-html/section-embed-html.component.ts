import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-section-embed-html',
  standalone: true,
  imports: [],
  templateUrl: './section-embed-html.component.html',
  styleUrl: './section-embed-html.component.scss'
})
export class SectionEmbedHtmlComponent implements OnChanges{
  @Input({required: true}) data!: string;
  private sanitizer = inject(DomSanitizer);
  safeHtml?: SafeHtml;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.data);      
    }
  }
}

