import { Component, effect, Inject, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ContentStore } from '../../../stores/content.store';
import { Message, MessagesService } from '../../../services/messages.service';

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
  private _messages = inject(MessagesService);

  constructor(){
    effect(() => {
      const loader = this.store.isLoading()     
      if(loader === false && this._messages.getMessages.length) {    
        this.openSnackBar()
      }      
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(InfoPopupSnackbarComponent, {
      duration: 10 * 1000,
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
export class InfoPopupSnackbarComponent implements OnInit {
  readonly store = inject(ContentStore);
  private _messages = inject(MessagesService);
  messages: Message[] = [];
  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {   
    this.messages = this._messages.getMessages;
    this._messages.resetMessages();
  }
}