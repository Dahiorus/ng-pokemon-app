import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonService } from "@app/pokemon/pokemon.service";
import { Pokemon } from "@model/pokemon.type";
import { PokemonTypeColorPipe } from "@shared/pokemon-type-color.pipe";

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

  pokemon?: Pokemon;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      this.pokemon = this.pokemonService.getPokemonById(Number(id));
    });
  }

  goBack() {
    this.router.navigate(["pokemons"]);
  }
}
