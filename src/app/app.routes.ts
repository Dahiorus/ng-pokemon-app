import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from '@app/login/login.component';

export const routes: Routes = [
  {
    path: "pokemons",
    loadChildren: () => import('@app/pokemon/pokemon.routes').then(mod => mod.pokemonRoutes),
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
