import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PartnerResponse {
  id: number;

  code: string;
  name: string;

  email: string;
  phone: string;
  address: string;

  typeCodeRef: string;
  typeLabelFr: string;
  typeLabelEn: string;

  statusCodeRef: string;
  statusLabelFr: string;
  statusLabelEn: string;
}

export interface PartnerRequest {
  code: string;
  name: string;

  email: string;
  phone: string;
  address: string;

  typeCodeRef: string;
  statusCodeRef: string;
}

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/partners';

  getPartners(type?: string): Observable<PartnerResponse[]> {
    let params = new HttpParams();

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<PartnerResponse[]>(this.apiUrl, { params });
  }

  createPartner(request: PartnerRequest) {
    return this.http.post<PartnerResponse>(this.apiUrl, request);
  }

  updatePartner(id: number, request: PartnerRequest) {
    return this.http.put<PartnerResponse>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

  deletePartner(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}