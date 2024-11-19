import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VariantNames } from '../../../models/db-data.model';
import { ContentStore } from '../../../stores/content.store';
import { VARIANTS } from '../../pages/specific-edition-page';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,  
})
export class HeaderComponent {
  readonly store = inject(ContentStore);
  variantNames = VariantNames;
  variants = VARIANTS;

  public changeVariant(variantId: number){    
    this.store.changeVariant(variantId);    
    this.store.loadContents(variantId);
  }
}
