import { Component, effect, inject, input } from '@angular/core';
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

  constructor() {
    effect(() => {
      console.log('Список обновился:', this.characters());
    });
  }
}
