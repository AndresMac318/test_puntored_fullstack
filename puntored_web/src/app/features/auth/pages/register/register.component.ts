import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { SignupRequest } from '../../interfaces/signupRequest.interface';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <mat-card class="register-card">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>{{ "AUTH.REGISTER.title" | translate }}</h2>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.name" | translate }}</mat-label>
          <input matInput type="text" formControlName="name" required>
          @if(controlHasError('name', 'required')){
            <mat-error>
              * {{ "AUTH.errors.name" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.lastname" | translate }}</mat-label>
          <input matInput type="text" formControlName="lastName" required>
          @if(controlHasError('name', 'required')){
            <mat-error>
              * {{ "AUTH.errors.lastname" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.email" | translate }}</mat-label>
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
          <mat-label>{{ "AUTH.REGISTER.FORM.labels.password" | translate }}</mat-label>
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

        <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
          {{ "AUTH.REGISTER.FORM.text_btn" | translate }}
        </button>

        <a routerLink="/auth/login" class="register-link">{{ "AUTH.REGISTER.FORM.text_have_account" | translate }}</a>
      </form>
    </mat-card>
  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  private authSvc = inject(AuthService);

  registerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  public hidePassword = true;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });  
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      const { name, lastName, email, password } = this.registerForm.value;
      const userData: SignupRequest = {
        firstName: name,
        lastName: lastName,
        email,
        password
      };
      this.authSvc.signup(userData).subscribe();
    }
  }
  
  controlHasError(control: string, error: string) {
    return this.registerForm.controls[control].hasError(error);
  }

}
