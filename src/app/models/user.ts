export interface User {
    id: number;
  name: string;
  email: string;
  password_hash: string;
  suspension: number;
  banned: number;
  last_login?: Date;
  activity_count: number;
}
