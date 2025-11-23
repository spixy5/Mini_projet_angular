export interface Ticket {
  id: number;
  user_id: number;
  museum_id: number;
  museum_name: string;
  user_email: string;
  totalAmount: number;
  numberOfTickets: number;
  visit_date: Date;
  ticket_type: 'group' | 'adult' | 'child' | 'student';
  promo_code: string | null;
  special_requests?: string[];
}