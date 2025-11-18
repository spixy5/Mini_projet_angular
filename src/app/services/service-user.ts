import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser {
   private http: HttpClient=inject(HttpClient);
    private URL='http://localhost/www/Mini_prj/mini_prj_angular/API'
  login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.URL}/login.php`, { email, password });
}
}
