import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { CharacterDetail } from './features/character-detail/character-detail';

export const routes: Routes = [
  {
    path: '',
    component: CharacterList,
    title: 'Home',
  },
  {
    path: 'character/:id',
    component: CharacterDetail,
    title: 'Character Detail',
  },
];
