import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {Router, RouterLink} from '@angular/router';
import { PokemonService } from "@app/pokemon/pokemon.service";
import { Pokemon } from "@model/pokemon.type";
import { BorderCardDirective } from "@shared/border-card.directive";
import { PokemonTypeColorPipe } from "@shared/pokemon-type-color.pipe";
import {Observable} from 'rxjs';
import {SearchPokemonComponent} from '@app/pokemon/search-pokemon/search-pokemon.component';

@Component({
  selector: "pkmn-list-pokemon",
  standalone: true,
  imports: [CommonModule, BorderCardDirective, PokemonTypeColorPipe, RouterLink, SearchPokemonComponent],
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent {
  private router: Router = inject(Router);
  private pokemonService: PokemonService = inject(PokemonService);

  pokemons$?: Observable<Pokemon[]> = this.pokemonService.listPokemons();

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["pokemons", pokemon.id]);
  }
}
