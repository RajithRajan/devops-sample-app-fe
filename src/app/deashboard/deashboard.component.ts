import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deasshboard',
  templateUrl: './deashboard.component.html',
  styleUrls: ['./deashboard.component.css']
})
export class DeashboardComponent implements OnInit {
  user_name = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
      if(history.state.user_name){
      this.user_name = history.state.user_name;
      }else{
        this.router.navigate(["/login"]);
      }
  }

}
