import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleCodeRef: string;
  roleLabelFr: string;
  roleLabelEn: string;
  statusCodeRef: string;
  statusLabelFr: string;
  statusLabelEn: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/users';

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  getUsersPage(page: number, size: number): Observable<PageResponse<UserResponse>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<PageResponse<UserResponse>>(`${this.apiUrl}/page`, {
      params,
    });
  }

createUser(request: any) {
  return this.http.post<UserResponse>(this.apiUrl, request);
}

updateUser(id: number, request: any) {
  return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, request);
}

deleteUser(id: number) {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}
