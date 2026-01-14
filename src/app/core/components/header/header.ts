import { Component, inject } from '@angular/core';
import { CharacterService } from '../../services/character';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private characterService = inject(CharacterService);

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.characterService.updateSearchName(value); // Пишем в сигнал сервиса
  }
}
