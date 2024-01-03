import {Routes} from '@angular/router';
import {ListPokemonComponent} from '@app/pokemon/list-pokemon/list-pokemon.component';
import {AddPokemonComponent} from '@app/pokemon/add-pokemon/add-pokemon.component';
import {DetailPokemonComponent} from '@app/pokemon/detail-pokemon/detail-pokemon.component';
import {authGuard} from '@app/auth/auth.guard';
import {EditPokemonComponent} from '@app/pokemon/edit-pokemon/edit-pokemon.component';

export const pokemonRoutes: Routes = [
   {
      path: "",
      component: ListPokemonComponent,
   },
   {
      path: "new",
      component: AddPokemonComponent,
   },
   {
      path: ":id",
      component: DetailPokemonComponent,
      canActivate: [authGuard],
   },
   {
      path: ":id/edit",
      component: EditPokemonComponent,
      canActivate: [authGuard],
   },
];