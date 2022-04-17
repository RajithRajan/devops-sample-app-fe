import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  constructor(public messageService: MessageService) {
    messageService.display().subscribe({
      next: (msg) => {
        if (msg) {
          this.messages.push(msg);
          setTimeout(() => {
            this.messages = [];
          }, 4000);
        }
      }
    });
  }
  
  ngOnInit(): void {
  }

}
