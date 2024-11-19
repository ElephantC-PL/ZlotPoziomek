import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { BooksStore } from '../../stores/test.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [JsonPipe, FormsModule,CommonModule],
  template: `
    <p>Books: {{ store.books() | json }}</p>
    <p>Loading: {{ store.isLoading() }}</p>
    
    <p>Pagination: {{ store.filter() | json }}</p>

   
    <p>Query: {{ store.filter.query() }}</p>
    <p>Order: {{ store.filter.order() }}</p>
    <p>Sorted: {{ store.sortedBooks() | json }}</p>
    <input [(ngModel)]="vlue" />
    <button (click)="onClick()">submit</button>
  `,
  providers: [BooksStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './test.component.scss'
})
export class TestComponent {
  readonly store = inject(BooksStore);
  vlue = '';
  onClick():void {
    this.store.addBook(this.vlue);
  }
}
