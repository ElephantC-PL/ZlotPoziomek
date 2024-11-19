import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type BooksState = {
  books: string[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: ['zośka', 'kryśka', 'zdzisia'],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
{ providedIn: 'root' },
    withState(initialState),
    withComputed(({ books, filter }) => ({
        booksCount: computed(() => books().length),
        sortedBooks: computed(() => {
          const direction = filter.order() === 'asc' ? 1 : -1;

            return books().sort((a, b) => {
                const firstLetterA = a.charAt(0).toLowerCase();
                const firstLetterB = b.charAt(0).toLowerCase();
            
                if (firstLetterA < firstLetterB) {
                    return -1;
                }
                if (firstLetterA > firstLetterB) {
                   return 1;
                }
                return 0; 
            });
        })
    })),
    withMethods((store) => ({     
        addBook(book: string): void {            
            patchState(store, ({ books }) => ({ books: [...books, book] }));
        }
    })),    
)
    

