import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface ReferentielResponse {
  codeRef: string;
  labelFr: string;
  labelEn: string;
  value?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReferentielService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/referentiels';

  getByType(codeRefType: string): Observable<ReferentielResponse[]> {
    return this.http.get<ReferentielResponse[]>(
      `${this.apiUrl}/type/${codeRefType}`
    );
  }
}