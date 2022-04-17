import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  loggedInUser = new User("", "", "", false, "");
  private API_URL = environment.API_URL;

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + "/login", user).pipe(
      //map(item=> {return new User(item.user_email,item.user_name,true,"")}),
      //tap(() => this.validedUser(user)),
      catchError(this.handleError<User>('loginUsers'))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + "/register", user).pipe(
      catchError(this.handleError<User>('registerUser'))
    );
  }

  private validedUser(user: User) {
    if (user.user_name) {
      this.loggedInUser.user_email = user.user_email;
      this.loggedInUser.user_name = user.user_name;
      this.loggedInUser.loggedIn = true;
    }
  }

  logoutUser() {
    this.loggedInUser.loggedIn = false;
  }

  private log(message: string) {
    this.messageService.add('UserService:' + message, 0);
    // setTimeout(() => {
    //   this.messageService.clear();
    // }, 4000);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
