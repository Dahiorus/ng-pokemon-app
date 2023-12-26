import { Injectable } from "@angular/core";
import { POKEMONS } from "@model/mock-pokemon";
import { Pokemon } from "@model/pokemon.type";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  listPokemons(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonById(id: number): Pokemon | undefined {
    return POKEMONS.find((pokemon) => pokemon.id == id);
  }

  getPokemonTypes(): string[] {
    return [...new Set(POKEMONS.flatMap((pokemon) => pokemon.types))];
  }
}
