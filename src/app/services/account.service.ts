import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { ReplaySubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }


  baseUrl: string = 'https://localhost:44381/api/Account/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();





  login(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next();
  }

  register(model:any)
  {
    return this.httpClient.post<User>(this.baseUrl+'account/register',model)
                          .pipe(
                            map((user:User)=>
                              {
                                if(user)
                                {
                                  localStorage.setItem('user',JSON.stringify(user));
                                  this.currentUserSource.next(user);
                                }
                              })
                          )
  }




}
