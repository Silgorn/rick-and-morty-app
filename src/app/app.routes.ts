import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';

export const routes: Routes = [
  {
    path: '',
    component: CharacterList,
    title: 'Character List',
  },
];
