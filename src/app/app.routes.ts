import { Routes } from "@angular/router";
import { DetailPokemonComponent } from "@app/pokemon/detail-pokemon/detail-pokemon.component";
import { ListPokemonComponent } from "@app/pokemon/list-pokemon/list-pokemon.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: "pokemons",
    component: ListPokemonComponent,
  },
  {
    path: "pokemons/:id",
    component: DetailPokemonComponent,
  },
  {
    path: "",
    redirectTo: "pokemons",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
