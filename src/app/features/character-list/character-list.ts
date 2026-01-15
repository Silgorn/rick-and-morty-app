import { Component, inject } from '@angular/core';
import { CharacterService } from '../../core/services/character';
import { CharacterCard } from './components/character-card/character-card';

@Component({
  selector: 'app-character-list',
  imports: [CharacterCard],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList {
  private characterService = inject(CharacterService);

  characters = this.characterService.characters;
  isLoading = this.characterService.isLoading;
  searchTerm = this.characterService.searchTerm;
}
