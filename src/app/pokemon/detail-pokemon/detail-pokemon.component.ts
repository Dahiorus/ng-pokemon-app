import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonService } from "@app/pokemon/pokemon.service";
import { Pokemon } from "@model/pokemon.type";
import { PokemonTypeColorPipe } from "@shared/pokemon-type-color.pipe";
import {filter, first, flatMap, map, Observable, switchMap} from 'rxjs';

@Component({
  selector: "pkmn-detail-pokemon",
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe],
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private pokemonService: PokemonService = inject(PokemonService);

  pokemon$?: Observable<Pokemon | undefined>;

  ngOnInit(): void {
    this.pokemon$ = this.route.params.pipe(map(params => params['id']),
       switchMap(id => this.pokemonService.getPokemonById(id)));
  }

  goBack() {
    this.router.navigate(["pokemons"]);
  }

  goToEdit(pokemon: Pokemon) {
    this.router.navigate(["pokemons", pokemon.id, "edit"]);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
       .pipe(first())
       .subscribe(() => this.goBack());
  }
}
