import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { HeaderComponent } from './components/organisms/header/header.component';
import { OnePageComponent } from './components/templates/one-page/one-page.component';
import { specificEditionPage } from './components/pages/specific-edition-page';

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
  public page = specificEditionPage;
  private _data = inject(DataService);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    setTimeout(()=>{this._data.getData()},1);

    this._route.queryParams.subscribe(params => {     
      this._data.isPreview = params['preview'] === 'true';          
    });    
  }
}
