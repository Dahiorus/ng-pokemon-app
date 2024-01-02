import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "@model/pokemon.type";
import { FormPokemonComponent } from "../form-pokemon/form-pokemon.component";
import { PokemonService } from "../pokemon.service";
import {map, Observable, switchMap} from 'rxjs';
import {LoadingComponent} from '@shared/loading/loading.component';

@Component({
  selector: "pkmn-edit-pokemon",
  standalone: true,
   imports: [CommonModule, FormPokemonComponent, LoadingComponent],
  templateUrl: "./edit-pokemon.component.html",
})
export class EditPokemonComponent implements OnInit {
  private pokemonService: PokemonService = inject(PokemonService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  pokemon$?: Observable<Pokemon | undefined>;

  ngOnInit(): void {
    this.pokemon$ = this.route.params.pipe(
       map(params => params['id']),
       switchMap(id => this.pokemonService.getPokemonById(Number(id)))
    );
  }
}
