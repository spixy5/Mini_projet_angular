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
  return this.http.post<any>(`${this.URL}/login.php`,{email, password });
}
  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/signup.php`, {name, email, password });
  }
    getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.URL}/get_all_users.php`);
  }
   sendConfirmationCode(email: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/send_confirmation_code.php`,{email});
  }
  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/update_password.php`,{email, newPassword });
  }
  adminLogin(username: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.URL}/admin_login.php`,{username, password });
}
}
