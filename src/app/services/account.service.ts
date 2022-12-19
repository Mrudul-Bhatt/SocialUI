import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { BehaviorSubject, map, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private subject = new BehaviorSubject<User | null>(null);

  user$: Observable<User | null> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }

  baseUrl = 'https://localhost:7044/api/';

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap((user) => this.subject.next(user)),
      shareReplay()
    );
    // this.subject.next(user);
  }

  logout() {
    this.subject.next(null);
  }
}
