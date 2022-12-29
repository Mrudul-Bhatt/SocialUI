import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // private subject = new BehaviorSubject<User | null>(null);

  // user$: Observable<User | null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  loggedInUser$: Observable<string | undefined>;

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.loggedInUser$ = this.currentUser$.pipe(
      map((user) => user?.userName.toUpperCase())
    );
  }

  baseUrl = environment.apiUrl;

  // loginV1(model: any) {
  //   return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
  //     tap((user) => this.subject.next(user)),
  //     shareReplay()
  //   );
  //   // this.subject.next(user);
  // }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      // tap((user: User) => this.subject.next(user)),
      shareReplay()
    );
    // this.subject.next(user);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      // tap((user: User) => this.subject.next(user)),
      shareReplay()
    );
    // this.subject.next(user);
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
