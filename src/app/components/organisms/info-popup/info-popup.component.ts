import { Component, effect, Inject, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ContentStore } from '../../../stores/content.store';

export interface Message { 
  text: string,
  isError?: boolean
}

@Component({
  selector: 'app-info-popup',
  standalone: true,
  imports: [MatSnackBarActions, MatSnackBarAction],
  template: '',
  styles: ''
})
export class InfoPopupComponent {
  private _snackBar = inject(MatSnackBar);
  readonly store = inject(ContentStore); 

  constructor(){
    effect(() => {
      const loader = this.store.isLoading()
      const messages = this.store.dbMessages()
      if(loader === false && messages.length) this.openSnackBar()      
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(InfoPopupSnackbarComponent, {
      duration: 2 * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: 'info-popup.component.html',
  styleUrl: 'info-popup.component.scss',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatIconModule],
})
export class InfoPopupSnackbarComponent {
  readonly store = inject(ContentStore);
  snackBarRef = inject(MatSnackBarRef);
}