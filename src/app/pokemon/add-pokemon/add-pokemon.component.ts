import {Component, OnInit} from '@angular/core';
import {FormPokemonComponent} from '@app/pokemon/form-pokemon/form-pokemon.component';
import {Pokemon} from '@model/pokemon.type';

@Component({
  selector: 'pkmn-add-pokemon',
  standalone: true,
  imports: [
    FormPokemonComponent
  ],
  templateUrl: './add-pokemon.component.html',
})
export class AddPokemonComponent implements OnInit {

  pokemon?: Pokemon;

  ngOnInit() {
    this.pokemon = new Pokemon();
  }
}
