import {Injectable} from '@angular/core';
import {delay, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl?: string;

  constructor() { }

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = name == 'pikachu' && password == 'pikachu'

    return of(isLoggedIn).pipe(
       delay(1000),
       tap(value => this.isLoggedIn = value),
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
