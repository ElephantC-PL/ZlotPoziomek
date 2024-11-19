import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/organisms/header/header.component';
import { OnePageComponent } from './components/templates/one-page/one-page.component';
import { SPECIFIC_EDITION_PAGE } from './components/pages/specific-edition-page';
import { ContentStore } from './stores/content.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet, 
    CommonModule, 
    OnePageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {    
  page = SPECIFIC_EDITION_PAGE; 
  private _route = inject(ActivatedRoute);
  readonly store = inject(ContentStore);

  ngOnInit(): void { 
    this._route.queryParams.subscribe(params => {    
      this.store.setPreview(params['preview'] === 'true');
      this.store.loadContents(this.store.variantId());      
    });    
  }
}
