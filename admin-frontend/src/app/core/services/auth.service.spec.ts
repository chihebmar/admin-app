import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send login request', () => {
    const mockResponse = {
      token: 'fake-jwt-token',
    };

    service
      .login({
        email: 'admin@test.com',
        password: 'password',
      })
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      'http://localhost:8080/auth/login'
    );

    expect(req.request.method).toBe('POST');

    expect(req.request.body).toEqual({
      email: 'admin@test.com',
      password: 'password',
    });

    req.flush(mockResponse);
  });
});