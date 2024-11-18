import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataService } from '../../../services/data.service';
import { VariantNames } from '../../../models/db-data.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public data = inject(DataService);
  public variantNames = VariantNames;

  public changeVariant(variantId: number){
    this.data.changeVariant(variantId);
  }
}
