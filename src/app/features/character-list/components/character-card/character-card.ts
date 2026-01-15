import { Component, input } from '@angular/core';
import { Character } from '../../../../core/models/character.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  character = input.required<Character>();
}
