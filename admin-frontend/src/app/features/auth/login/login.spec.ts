import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceMock = {
    login: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    vi.clearAllMocks();

    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();

    component.togglePassword();

    expect(component.showPassword).toBeTruthy();

    component.togglePassword();

    expect(component.showPassword).toBeFalsy();
  });

  it('should call auth service and navigate to users on successful login', () => {
    authServiceMock.login.mockReturnValue(of({ token: 'fake-token' }));

    component.email = 'admin@test.com';
    component.password = 'password';

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: 'password',
    });

    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should display error message when login fails', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => new Error('Invalid credentials'))
    );

    component.email = 'wrong@test.com';
    component.password = 'wrong';

    component.login();

    expect(component.errorMessage).toBe('Invalid email or password');
  });
});