import { Injectable } from '@angular/core';

export interface Message { 
  text: string,
  isError?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages: Message[] = []

  set newMessage(message: Message) {
    this._messages.push(message);
  }

  get getMessages(): Message[] {
    return this._messages;
  }

  resetMessages():void {
    this._messages = [];
  }
}
