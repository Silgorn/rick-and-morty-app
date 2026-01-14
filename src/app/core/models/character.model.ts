export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  image: string;
  gender: string;
  location: {
    name: string;
    url: string;
  };
}

export interface CharacterResponse {
  info: any;
  results: Character[];
}
