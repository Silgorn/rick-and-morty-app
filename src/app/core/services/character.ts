import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Character, CharacterResponse } from '../models/character.model';
import { catchError, combineLatest, debounceTime, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  searchTerm = signal<string>('');
  isLoading = signal<boolean>(false);
  currentPage = signal<number>(1);
  errorMessage = signal<string | null>(null);
  totalInfo = signal<{ pages: number; count: number } | null>(null);

  updateSearchName(name: string) {
    this.searchTerm.set(name);
    this.currentPage.set(1);
  }

  characters = toSignal(
    combineLatest([toObservable(this.searchTerm), toObservable(this.currentPage)]).pipe(
      debounceTime(300),

      tap(([name, page]) => {
        this.isLoading.set(true);
        this.errorMessage.set(null);
      }),
      switchMap(([name, page]) => {
        return this.http.get<CharacterResponse>(`${this.apiUrl}/?name=${name}&page=${page}`).pipe(
          tap((res) => {
            this.totalInfo.set(res.info);
            this.isLoading.set(false);
          }),
          map((res) => res.results),
          catchError((error) => {
            this.isLoading.set(false);
            this.totalInfo.set(null);
            if (error.status === 404) {
              this.errorMessage.set(`Nothing found`);
            }
            return of([]);
          }),
        );
      }),
    ),
    { initialValue: [] as Character[] },
  );

  getCharacterById(id: string) {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}
