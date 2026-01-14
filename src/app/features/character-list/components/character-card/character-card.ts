import { Component, input } from '@angular/core';
import { Character } from '../../../../core/models/character.model';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  character = input.required<Character>();
}
