import {  ComponentRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SectionLayoutComponent } from '../section-layout/section-layout.component';

@Directive({
  selector: '[appSectionWrapper]',
  standalone: true
})
export class SectionWrapperDirective implements OnInit {
  private wrapperContainer?: ComponentRef<SectionLayoutComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef    
  ) { }

  ngOnInit() {  
    this.wrapperContainer = this.viewContainerRef.createComponent(SectionLayoutComponent);
    this.wrapperContainer.instance.template = this.templateRef;    
  }
}
