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
    private URL='http://localhost/www/Mini_prj/mini_prj_angular/API'
  getAllMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(`${this.URL}/get_all_museums.php`);
  }
  getMuseumById(id: number): Observable<Museum> {
    return this.http.get<Museum>(`${this.URL}/get_museum_by_id.php?id=${id}`);
  }
  createMuseum(museum: Museum): Observable<Museum> {
    return this.http.post<Museum>(`${this.URL}/add_museums.php`, museum);
  }
  updateMuseum(museum: Museum): Observable<Museum> {
    return this.http.put<Museum>(`${this.URL}/update_museums.php`, museum);
  }
  deleteMuseum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/delete_museums.php?id=${id}`);
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

}
