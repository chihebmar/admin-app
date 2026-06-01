import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { RoleInterfaceService } from '../../core/services/role-interface.service';


interface SidebarMenuItem {
  codeRef: string;
  label: string;
  icon: string;
  route: string;
}


const ALL_MENU_ITEMS : SidebarMenuItem[] = [
  {
    codeRef: 'INTERFACE_DASHBOARD',
    label: 'SIDEBAR.DASHBOARD',
    icon: 'pi pi-th-large',
    route: '/dashboard',
  },
  {
    codeRef: 'INTERFACE_USERS',
    label: 'SIDEBAR.USERS',
    icon: 'pi pi-users',
    route: '/users',
  },
  {
  codeRef: 'INTERFACE_PERMISSIONS',
  label: 'SIDEBAR.PERMISSIONS',
  icon: 'pi pi-lock',
  route: '/permissions',
},
{
  codeRef: 'INTERFACE_CLIENTS',
  label: 'SIDEBAR.CLIENTS',
  icon: 'pi pi-users',
  route: '/clients',
},
{
  codeRef: 'INTERFACE_SUPPLIERS',
  label: 'SIDEBAR.SUPPLIERS',
  icon: 'pi pi-truck',
  route: '/suppliers',
},
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private roleInterfaceService = inject(RoleInterfaceService);
  private cdr = inject(ChangeDetectorRef);

  menuItems : SidebarMenuItem[] = [];

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.roleInterfaceService.getMyInterfaces().subscribe({
      next: (allowedCodes) => {
        this.menuItems = ALL_MENU_ITEMS.filter((item) =>
          allowedCodes.includes(item.codeRef)
        );

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading menu permissions:', error);
        this.menuItems = [];
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }
}