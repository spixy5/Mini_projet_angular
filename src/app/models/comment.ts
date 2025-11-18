export interface Comment {
  id?: number;
  museum_id: number;
  like_count?: number;
  author_name: string;
  author_email: string;
  comment: string;
  created_at?: string;
}
