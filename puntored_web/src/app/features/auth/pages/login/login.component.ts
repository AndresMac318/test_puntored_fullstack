import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { LoginRequest } from '../../interfaces/loginRequest.interface';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslatePipe
  ],
  template: `
    <mat-card class="login-card">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>{{ "AUTH.LOGIN.title" | translate }}</h2>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.LOGIN.FORM.labels.email" | translate }}</mat-label>
          <input matInput type="email" formControlName="email" required>
          @if(controlHasError('email', 'required')){
            <mat-error>
              * {{ "AUTH.errors.email" | translate }}
            </mat-error>
          }
          @if(controlHasError('email', 'email')){
            <mat-error>
              * {{ "AUTH.errors.email_invalid" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.LOGIN.FORM.labels.password" | translate }}</mat-label>
          <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
          <button mat-icon-button matSuffix class="hide-password-btn" (click)="togglePasswordVisibility()" type="button">
            <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          @if (controlHasError('password', 'required')) {
            <mat-error>
              * {{ "AUTH.errors.password" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          {{ "AUTH.LOGIN.FORM.text_btn" | translate }}
        </button>

        <a routerLink="/auth/register" class="register-link">{{ "AUTH.LOGIN.FORM.text_not_account" | translate }}</a>
      </form>
    </mat-card>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public hidePassword = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authSvc: AuthService
  ){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['recharges/all-recharges']);
    }
  }

  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  get username() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const body: LoginRequest = {
        email,
        password
      }
      this.authSvc.login(body).subscribe();
    }
  }

  

}
