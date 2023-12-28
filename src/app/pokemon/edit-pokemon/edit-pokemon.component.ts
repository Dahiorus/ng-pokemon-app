import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "@model/pokemon.type";
import { FormPokemonComponent } from "../form-pokemon/form-pokemon.component";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "pkmn-edit-pokemon",
  standalone: true,
  imports: [CommonModule, FormPokemonComponent],
  templateUrl: "./edit-pokemon.component.html",
})
export class EditPokemonComponent implements OnInit {
  private pokemonService: PokemonService = inject(PokemonService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  pokemon?: Pokemon;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.pokemon = this.pokemonService.getPokemonById(Number(id));
      }
    });
  }
}
