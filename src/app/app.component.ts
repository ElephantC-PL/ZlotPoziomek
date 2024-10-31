import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbDataService } from './services/db-data.service';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "./components/sections/banner/banner.component";
import { EditionComponent } from "./components/sections/edition/edition.component";
import { HowToGetComponent } from "./components/sections/how-to-get/how-to-get.component";
import { AboutComponent } from "./components/sections/about/about.component";
import { AccommodationComponent } from './components/sections/accommodation/accommodation.component';
import { FoodComponent } from './components/sections/food/food.component';
import { ProgramComponent } from './components/sections/program/program.component';
import { RoutesComponent } from './components/sections/routes/routes.component';
import { RegistrationComponent } from './components/sections/registration/registration.component';
import { TShirtsComponent } from './components/sections/t-shirts/t-shirts.component';
import { ContackComponent } from './components/sections/contack/contack.component';
import { DataService } from './services/data.service';
import { SectionWrapperDirective } from './components/base-section/section-wrapper.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    BannerComponent, 
    EditionComponent, 
    HowToGetComponent, 
    AboutComponent,
    AccommodationComponent,
    FoodComponent,
    ProgramComponent,
    RoutesComponent,
    RegistrationComponent,
    TShirtsComponent,
    ContackComponent,
    SectionWrapperDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private _isPreview = true; 
  private _data = inject(DataService);

  ngOnInit(): void {
    this._data.getData(this._isPreview);
  }

}
