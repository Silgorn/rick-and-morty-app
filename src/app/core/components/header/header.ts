import { Component, inject } from '@angular/core';
import { CharacterService } from '../../services/character';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private characterService = inject(CharacterService);
  private router = inject(Router);
  searchTerm = this.characterService.searchTerm;

  isDetailsPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects.includes('/character/'))
    ),
    { initialValue: false }
  );

  clearSearch(input: HTMLInputElement, shouldFocus: boolean = true) {
    input.value = '';
    this.characterService.updateSearchName('');
    if (shouldFocus) input.focus();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.characterService.updateSearchName(value);
  }

  goHome() {
    this.characterService.currentPage.set(1);
    this.characterService.updateSearchName('');
    this.router.navigate(['/']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
