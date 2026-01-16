import { Component, inject, Input, signal } from '@angular/core';
import { Location } from '@angular/common';
import { CharacterService } from '../../core/services/character';
import { Character } from '../../core/models/character.model';
import { DetailSkeleton } from './detail-skeleton/detail-skeleton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  imports: [DetailSkeleton],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss',
})
export class CharacterDetail {
  private characterService = inject(CharacterService);
  private location = inject(Location);
  private router = inject(Router);

  @Input() set id(characterId: string) {
    this.characterService.getCharacterById(characterId).subscribe((data) => {
      this.character.set(data);
    });
  }

  character = signal<Character | null>(null);

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
