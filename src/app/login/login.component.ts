import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new User('','', '', false, '');
  constructor(private router: Router, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.loginUser(this.model).subscribe(validUser => this.redirectToDashboard(validUser));
  }

  redirectToDashboard(user: User) {
    if (user.user_name) {
      this.router.navigate(["/dashboard"], { state: { user_name: user.user_name } });
    }
  }
}
