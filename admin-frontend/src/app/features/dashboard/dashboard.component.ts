import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService, UserResponse } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  roleStats: { label: string; count: number }[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.userService.getUsersPage(0, 1000).subscribe({
      next: (response) => {
        const users = response.content;

        this.totalUsers = response.totalElements;
        this.activeUsers = users.filter(u => u.statusCodeRef === 'STATUS_ACTIVE').length;
        this.inactiveUsers = users.filter(u => u.statusCodeRef === 'STATUS_INACTIVE').length;

        this.roleStats = this.buildRoleStats(users);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
      },
    });
  }

  private buildRoleStats(users: UserResponse[]): { label: string; count: number }[] {
    const map = new Map<string, number>();

    users.forEach(user => {
      const label = user.roleLabelFr || user.roleCodeRef;
      map.set(label, (map.get(label) || 0) + 1);
    });

    return Array.from(map.entries()).map(([label, count]) => ({
      label,
      count,
    }));
  }

  getBarWidth(count: number): string {
    if (this.totalUsers === 0) {
      return '0%';
    }

    return `${(count / this.totalUsers) * 100}%`;
  }
}