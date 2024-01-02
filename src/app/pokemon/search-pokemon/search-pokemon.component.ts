import {Component, inject, OnInit} from '@angular/core';
import {Pokemon} from '@model/pokemon.type';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {PokemonService} from '@app/pokemon/pokemon.service';

@Component({
  selector: 'pkmn-search-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  private router: Router = inject(Router);
  private pokemonService: PokemonService = inject(PokemonService);

  private searchTerms: Subject<string> = new Subject<string>();
  pokemons$?: Observable<Pokemon[]>;

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
       debounceTime(300),
       distinctUntilChanged(),
       switchMap((term: string) => this.pokemonService.searchPokemons(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    this.router.navigate(['pokemons', pokemon.id]);
  }
}
