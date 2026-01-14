import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterResponse } from '../models/character.model';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  searchTerm = signal<string>('');

  isLoading = signal<boolean>(false);

  updateSearchName(name: string) {
    this.searchTerm.set(name);
  }

  characters = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap((name) =>
        this.http.get<CharacterResponse>(`${this.apiUrl}/?name=${name}`).pipe(
          map((res) => res.results),
          tap(() => this.isLoading.set(false))
        )
      )
    ),
    { initialValue: [] as Character[] }
  );

  getCharacterById(id: string) {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
