import { Component, inject } from '@angular/core';
import { CharacterService } from '../../core/services/character';
import { CharacterCard } from './components/character-card/character-card';
import { CharacterSkeleton } from '../character-skeleton/character-skeleton';

@Component({
  selector: 'app-character-list',
  imports: [CharacterCard, CharacterSkeleton],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList {
  private characterService = inject(CharacterService);

  characters = this.characterService.characters;
  isLoading = this.characterService.isLoading;
  searchTerm = this.characterService.searchTerm;
  currentPage = this.characterService.currentPage;
  totalInfo = this.characterService.totalInfo;
  errorMessage = this.characterService.errorMessage;

  nextPage() {
    const info = this.totalInfo();
    if (info && this.currentPage() < info.pages) {
      this.currentPage.update((prev) => prev + 1);
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((prev) => prev - 1);
      this.scrollToTop();
    }
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
