import { Component, inject } from '@angular/core';
import { CharacterService } from '../../services/character';
import { NavigationEnd, RouterLink, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private characterService = inject(CharacterService);
  private router = inject(Router);
  searchTerm = this.characterService.searchTerm;

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.characterService.updateSearchName('');
    input.focus();
  }

  isDetailsPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects.includes('/character/'))
    ),
    { initialValue: false }
  );

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.characterService.updateSearchName(value);
  }
}
