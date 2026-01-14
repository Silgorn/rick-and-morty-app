import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterResponse } from '../models/character.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  characters = toSignal(
    this.http.get<CharacterResponse>(this.apiUrl).pipe(map((response) => response.results)),
    { initialValue: [] as Character[] }
  );

  getCharacterById(id: string) {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
