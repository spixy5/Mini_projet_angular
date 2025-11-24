import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Museum } from '../models/museum';
import { Comment } from '../models/comment';
import { PromoCode } from '../models/promo-code';

@Injectable({
  providedIn: 'root',
})
export class ServiceMuseum {
    private http: HttpClient=inject(HttpClient);
    private URL='http://localhost/www/project_farah/Mini_projet_angular/API';
    private apiKey = 'logfjk7s8jjz3txed7ixvnknuhhd1h1201inorqv';
  getAllMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(`${this.URL}/get_all_museums.php`);
  }
  getMuseumById(id: number): Observable<Museum> {
    return this.http.get<Museum>(`${this.URL}/get_museum_by_id.php?id=${id}`);
  }
  createMuseum(museum: Museum): Observable<any> {
    return this.http.post<Museum>(`${this.URL}/add_museum.php`, museum);
  }
  updateMuseum(museum: Museum): Observable<any> {
    return this.http.put<Museum>(`${this.URL}/update_museum.php`, museum);
  }
   updateMuseumVisits(museum_id: number): Observable<any> {
    return this.http.put<Museum>(`${this.URL}/update_visits_museum.php`, museum_id);
  }
    deleteMuseum(id: number): Observable<any> {
    return this.http.get<Museum>(`${this.URL}/delete_museum.php?id=${id}`);
  }
    getAllComments(museumId: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/get_museum_comments.php?museumId=${museumId}`);
  }
  addComment(comment: Comment): Observable<any> {
  return this.http.post<Comment>(`${this.URL}/add_comment.php`,comment);
}
  getAllPromoCodes(): Observable<any> {
  return this.http.get<any>(`${this.URL}/get_all_promo_codes.php`);
}
sendTicketPayment(ticket: any): Observable<any> {
  return this.http.post<any>(`${this.URL}/payment.php`, ticket);
}
markPromoCodeAsUsed(code: string): Observable<any> {
  return this.http.post<any>(`${this.URL}/use_promo_code.php`,{code });
}
  getAllTickets(): Observable<any> {
    return this.http.get<any>(`${this.URL}/get_all_tickets.php`);
  }
toggleLike(userId: number, commentId: number): Observable<any> {
  return this.http.post<any>(`${this.URL}/toggle_like.php`, {user_id: userId,comment_id: commentId});
}
getWeather(region: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/weather.php?region=${region}`);
  }

}
