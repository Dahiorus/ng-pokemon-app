import {inject, Injectable} from '@angular/core';
import {Pokemon} from '@model/pokemon.type';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class PokemonService {

  private http: HttpClient = inject(HttpClient);

  listPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
       tap(this.logResponse<Pokemon[]>),
       catchError(err => this.handleError(err, []))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
     const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
     return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions)
        .pipe(
           tap(this.logResponse<Pokemon>),
           catchError(err => this.handleError(err, undefined))
        );
  }

  getPokemonById(id: number): Observable<Pokemon | undefined> {
     return this.http.get<Pokemon>(`api/pokemons/${id}`).pipe(
        tap(this.logResponse<Pokemon>),
        catchError(err => this.handleError(err, undefined))
     );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
     const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
     return this.http.put<Pokemon>(`api/pokemons/${pokemon.id}`, pokemon, httpOptions)
        .pipe(
           this.logResponse,
           catchError(err => this.handleError(err, undefined))
        );
  }

   deletePokemonById(id: number): Observable<null> {
      return this.http.delete(`api/pokemons/${id}`)
         .pipe(
            tap(this.logResponse<any>),
            catchError(err => this.handleError(err, null))
         );
   }

  getPokemonTypes(): Observable<string[]> {
    return this.listPokemons().pipe(
          map(pokemons => pokemons.flatMap((pkmn: Pokemon) => pkmn.types)),
          map((types: string[]) => [... new Set(types)]),
          tap(this.logResponse<string[]>),
    );
  }

  private logResponse<T>(response: T): T {
     console.table(response);
     return response;
  }

  private handleError<T>(error: Error, returnedValue: T): Observable<T> {
      console.error(error);
      return of(returnedValue);
  }
}
