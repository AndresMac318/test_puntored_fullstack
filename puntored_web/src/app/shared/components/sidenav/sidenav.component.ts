import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../../core/services/sidenav.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  imports: [ 
    RouterOutlet, 
    RouterLink,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslatePipe
  ],
  template: `
    <mat-drawer-container class="container" autosize>
      
      <mat-drawer #drawer class="example-sidenav" mode="side">
        <ul>
          <li (click)="showFiller = !showFiller" mat-raised-button>
            <mat-icon>smartphone</mat-icon>
            <a>{{ "SIDENAV.ITEM1" | translate}}</a><mat-icon>
            <mat-icon>arrow_drop_down</mat-icon></mat-icon>
          </li>
          @if (showFiller) {
            <ul style="margin-left: 10px;">
              <li routerLink="buy">
                <mat-icon>shopping_cart</mat-icon>
                <a >{{ "SIDENAV.ITEM2" | translate}}</a>
              </li>
              <li routerLink="all-recharges">
                <mat-icon>history</mat-icon>
                <a>{{ "SIDENAV.ITEM3" | translate}}</a>
              </li>
            </ul>
          }
          
          <li>
            <mat-icon>styler</mat-icon>
            <a routerlink="">{{ "SIDENAV.ITEM4" | translate}}</a>
          </li>
          <li>
            <mat-icon>sell</mat-icon>
            <a routerlink="">{{ "SIDENAV.ITEM5" | translate}}</a>
          </li>
        </ul>
      </mat-drawer>

      <mat-drawer-content>
        <router-outlet/>
      </mat-drawer-content>

    </mat-drawer-container>
  `,
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit   {

  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;
  

  private sidenavSvc = inject(SidenavService);

  constructor(){
    effect(() => {
      this.sidenavSvc.toggleSidenavSignal();
      this.toggle();
    }) 
  }


  toggle(){
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  ngAfterViewInit() {
    // Verificamos si hay un valor inicial y actualizamos el drawer
    (this.sidenavSvc.toggleSidenavSignal()) ? this.drawer.open : this.drawer.close();
    
  }

}
