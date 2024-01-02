import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PokemonService} from '@app/pokemon/pokemon.service';
import {Pokemon} from '@model/pokemon.type';
import {PokemonTypeColorPipe} from '@shared/pokemon-type-color.pipe';
import {first, map, Observable, switchMap} from 'rxjs';
import {LoadingComponent} from '@shared/loading/loading.component';

@Component({
  selector: "pkmn-detail-pokemon",
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe, LoadingComponent],
  templateUrl: "./detail-pokemon.component.html",
})
export class DetailPokemonComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private pokemonService: PokemonService = inject(PokemonService);

  pokemon$?: Observable<Pokemon | undefined>;

  ngOnInit(): void {
    this.pokemon$ = this.route.params.pipe(map((params : Params) => params['id']),
       switchMap(id => this.pokemonService.getPokemonById(id)));
  }

  goBack() {
    this.router.navigate(["pokemons"]);
  }

  goToEdit(pokemon: Pokemon) {
    this.router.navigate(["pokemons", pokemon.id, "edit"]);
  }

  deletePokemon(pokemon: Pokemon) {
     const id: number | undefined = pokemon.id;
     if (id) {
      this.pokemonService.deletePokemonById(id)
         .pipe(first())
         .subscribe(() => this.goBack());
    }
  }
}
