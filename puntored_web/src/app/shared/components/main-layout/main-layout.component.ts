import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-main-layout',
  imports: [ HeaderComponent, SidenavComponent],
  template: `
    <app-header></app-header>
    <app-sidenav></app-sidenav>
  `,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
