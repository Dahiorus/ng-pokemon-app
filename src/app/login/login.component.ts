import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '@app/auth/auth.service';
import {Router} from '@angular/router';
import {Observable, of, tap} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)';
  isLoggedIn: boolean = false;
  name: string = '';
  password: string = '';


  setMessage(): void {
    this.message = this.isLoggedIn ? 'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
  }

  login(): void {
    this.authService.login(this.name, this.password).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.setMessage();
      if (isLoggedIn) {
        this.router.navigate(['pokemons']);
      }
      else {
        this.password = '';
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
