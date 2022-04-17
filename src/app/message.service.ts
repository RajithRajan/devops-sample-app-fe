import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private messages = new BehaviorSubject<Message>(new Message(''));

  add(message: string, mtype: number) {
    this.messages.next(new Message(message, mtype));
    return this.messages;
  }

  clear() {
    this.messages.next(new Message(''));
  }

  display(): Observable<Message> {
    return this.messages.asObservable();
  }
}
