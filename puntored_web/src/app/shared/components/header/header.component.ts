import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavService } from '../../../core/services/sidenav.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar>
      @if (isLoggedIn()) {
        <button 
          (click)="toggleSidenav()"
          type="button"
          mat-icon-button 
          class="example-icon" 
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
      }

      <span>Puntored</span>
      <span class="example-spacer"></span>

      <button mat-button [matMenuTriggerFor]="translateMenu">
        <mat-icon>translate</mat-icon>
        <mat-icon>arrow_drop_down</mat-icon>
      </button>
      <mat-menu #translateMenu="matMenu" xPosition="before">
        <button mat-menu-item (click)="changeLanguage('es')" >
          <span>español</span>
        </button>
        <button mat-menu-item (click)="changeLanguage('en')" >
          <span>english</span>
        </button>
      </mat-menu>

      @if (isLoggedIn()) {
        <button mat-icon-button [matMenuTriggerFor]="beforeMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #beforeMenu="matMenu" xPosition="before">
          <button (click)="logout()" mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      }
    </mat-toolbar>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authSvc = inject(AuthService);
  private sidenavSvc = inject(SidenavService);
  private translateSvc = inject(TranslateService);
  public isLoggedIn = signal(false);


  ngOnInit(): void {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged === 'true') {
      this.isLoggedIn.set(true);
    }
  }

  changeLanguage(lang: string){
    this.translateSvc.use(lang);
  }

  toggleSidenav(){
    this.sidenavSvc.toggleSignal();
  }

  logout(){
    this.authSvc.logout();
  }

}
