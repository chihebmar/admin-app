import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleInterfaceService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/role-interfaces';

  getMyInterfaces(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/my-interfaces`);
  }

  getInterfacesByRole(roleCodeRef: string) {
    return this.http.get<string[]>(`${this.apiUrl}/roles/${roleCodeRef}`);
  }

  updateRoleInterfaces(roleCodeRef: string, interfaceCodes: string[]) {
    return this.http.put<string[]>(`${this.apiUrl}/roles/${roleCodeRef}`, interfaceCodes);
  }
}
