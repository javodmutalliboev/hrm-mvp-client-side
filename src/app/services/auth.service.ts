import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginFormValue: { username: string; password: string }) {
    return this.httpClient
      .post<{ User: User; msg: string }>(
        `${environment.apis_domain}/users/login`,
        loginFormValue
      )
      .pipe(
        map((response) => {
          if (response.User) {
            localStorage.setItem('currentUser', JSON.stringify(response.User));
            this.currentUserSubject.next(response.User);
          }
          return response.User;
        })
      );
  }
}
