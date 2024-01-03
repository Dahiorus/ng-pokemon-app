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
       tap<Pokemon[]>(console.table),
       catchError(err => this.handleError(err, []))
    );
  }

  searchPokemons(term: string): Observable<Pokemon[]> {
     if (term.length < 2) {
        return of([]);
     }
     return this.http.get<Pokemon[]>(`api/pokemons?name=${term}`).pipe(
        tap<Pokemon[]>(console.table),
        catchError(err => this.handleError(err, []))
     );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
     const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
     return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions)
        .pipe(
           tap<Pokemon>(console.table),
           catchError(err => this.handleError(err, undefined))
        );
  }

  getPokemonById(id: number): Observable<Pokemon | undefined> {
     return this.http.get<Pokemon>(`api/pokemons/${id}`).pipe(
        tap<Pokemon>(console.table),
        catchError(err => this.handleError(err, undefined))
     );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
     const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
     };
     return this.http.put<Pokemon>(`api/pokemons/${pokemon.id}`, pokemon, httpOptions)
        .pipe(
           tap<Pokemon>(console.table),
           catchError(err => this.handleError(err, undefined))
        );
  }

   deletePokemonById(id: number): Observable<null> {
      return this.http.delete(`api/pokemons/${id}`)
         .pipe(
            tap<any>(console.table),
            catchError(err => this.handleError(err, null))
         );
   }

  getPokemonTypes(): Observable<string[]> {
    return this.listPokemons().pipe(
          map((pokemons: Pokemon[]) => pokemons.flatMap((pkmn: Pokemon) => pkmn.types)),
          map((types: string[]) => [... new Set(types)]),
          tap<string[]>(console.table),
    );
  }

  private handleError<T>(error: Error, returnedValue: T): Observable<T> {
      console.error(error);
      return of(returnedValue);
  }
}
