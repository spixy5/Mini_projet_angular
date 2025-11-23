export interface Ticket {
  id: number;
  user_id: number;
  museum_id: number;
  totalAmount: number;
  numberOfTickets: number;
  visit_date: string;
  ticket_type: 'group' | 'adult' | 'child' | 'student';
  promo_code: string | null;
  user_email: string;
  museum_name: string;
}