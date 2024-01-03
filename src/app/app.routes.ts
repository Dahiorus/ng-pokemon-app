import { Routes } from "@angular/router";
import { DetailPokemonComponent } from "@app/pokemon/detail-pokemon/detail-pokemon.component";
import { ListPokemonComponent } from "@app/pokemon/list-pokemon/list-pokemon.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditPokemonComponent } from "./pokemon/edit-pokemon/edit-pokemon.component";
import {AddPokemonComponent} from '@app/pokemon/add-pokemon/add-pokemon.component';
import {authGuard} from '@app/auth/auth.guard';
import {LoginComponent} from '@app/login/login.component';

export const routes: Routes = [
  {
    path: "pokemons",
    component: ListPokemonComponent,
  },
  {
    path: "pokemons/new",
    component: AddPokemonComponent,
  },
  {
    path: "pokemons/:id",
    component: DetailPokemonComponent,
    canActivate: [authGuard],
  },
  {
    path: "pokemons/:id/edit",
    component: EditPokemonComponent,
    canActivate: [authGuard],
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
