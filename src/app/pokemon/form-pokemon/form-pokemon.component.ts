import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { PokemonService } from "@app/pokemon/pokemon.service";
import { Pokemon } from "@model/pokemon.type";
import { PokemonTypeColorPipe } from "@shared/pokemon-type-color.pipe";
import {first, Observable, of} from 'rxjs';

@Component({
  selector: "pkmn-form-pokemon",
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonTypeColorPipe],
  templateUrl: "./form-pokemon.component.html",
  styleUrl: "./form-pokemon.component.css",
})
export class FormPokemonComponent implements OnInit {
  private pokemonService: PokemonService = inject(PokemonService);
  private router: Router = inject(Router);

  @Input() pokemon?: Pokemon;
  types$: Observable<string[]> = of([]);

  ngOnInit(): void {
    this.types$ = this.pokemonService.getPokemonTypes();
  }

  onSubmit() {
    if (this.pokemon) {
       this.pokemonService.updatePokemon(this.pokemon)
          .pipe(first())
          .subscribe(pokemon => this.router.navigate(["pokemons", this.pokemon?.id]));
    }
  }

  hasType(type: string): boolean {
    return this.pokemon?.types.includes(type) ?? false;
  }

  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon?.types.push(type);
      return;
    }

    const index: number | undefined = this.pokemon?.types.indexOf(type);
    if (index) {
      this.pokemon?.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    const types = this.pokemon?.types || [];

    if (types.length == 1 && this.hasType(type)) {
      return false;
    }

    return !(types.length >= 3 && !this.hasType(type));
  }
}
