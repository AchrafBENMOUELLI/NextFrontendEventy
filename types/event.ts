export interface Event {
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
  price: number;
  organizerId?: string; // le backend va remplir normalement
  imageUrl: string;
  nbPlaces: number;
  nbrLike?: number; // optional, default 0
}
