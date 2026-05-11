import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
menuItems = [
  { label: 'SIDEBAR.DASHBOARD', icon: 'pi pi-th-large', route: '/dashboard' },
  { label: 'SIDEBAR.USERS', icon: 'pi pi-users', route: '/users' },
];

private router = inject(Router);
private authService = inject(AuthService);


logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}

profile(): void {
  this.router.navigate(['/profile']);
}



}