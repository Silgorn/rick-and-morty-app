import { Component, inject, Input, input, signal } from '@angular/core';
import { CharacterService } from '../../core/services/character';
import { Character } from '../../core/models/character.model';
import { RouterLink } from '@angular/router';
import { DetailSkeleton } from './detail-skeleton/detail-skeleton';

@Component({
  selector: 'app-character-detail',
  imports: [RouterLink, DetailSkeleton],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss',
})
export class CharacterDetail {
  private characterService = inject(CharacterService);

  @Input() set id(characterId: string) {
    this.characterService.getCharacterById(characterId).subscribe((data) => {
      this.character.set(data);
    });
  }

  character = signal<Character | null>(null);
}
