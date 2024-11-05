import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-section-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-layout.component.html',
  styleUrl: './section-layout.component.scss'
})
export class SectionLayoutComponent {
  @Input() bg?: string;
  @Input() text?: string;
}
