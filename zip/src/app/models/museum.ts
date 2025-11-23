import { Comment } from "./comment";
import { Ticket } from "./ticket";
export interface Museum {
  id?: number;
  name: string;
  photo: string | null;
  description: string | null;
  is_open: number;
  entry_price: number;
  visits?: number;
  location: string;
  created_at: Date;
  category: 'Archaeological' | 'Ethnographic' | 'Islamic Art' | 'Traditional Arts' | 'Modern Art';
  opening_hour: Date; 
  closing_hour: Date; 
  comments?: Comment[];
  tickets? :Ticket[];
}