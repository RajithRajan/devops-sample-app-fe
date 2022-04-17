import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = new User('', '', '', false, '');
  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.registerUser(this.model).subscribe({
      next: (user) => this.redirectToLogin(user)
    });
  }

  redirectToLogin(user: User) {
    if (user._id) {
      this.messageService.add('User register successfully.', 1);
      this.router.navigate(["/login"]);
    }
  }

}
