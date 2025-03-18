import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { RechargeCreate } from '../../interfaces/recharge.interface';
import { RechargeService } from '../../services/recharge.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { cellPhoneValidator } from '../../../../core/validators/cellPhone.validator';
import { valueValidator } from '../../../../core/validators/valueRecharge.validator';
import { SupplierResponse } from '../../interfaces/supplier.interface';
import { MatDialog } from '@angular/material/dialog';
import { RechargeDetailDialogComponent } from '../../components/recharge-detail-dialog/recharge-detail-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recharge',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    TranslatePipe,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <div class="recharge">
      <h2 class="recharge__title">{{ "RECHARGES.BUY.title" | translate }}</h2>
      <form [formGroup]="rechargeForm" class="recharge__form" (ngSubmit)="onSubmit()">
        
      <div class="recharge__fieldcontainer">
        <mat-form-field appearance="outline" class="recharge__matfield">
          <mat-label>{{ "RECHARGES.BUY.FORM.labels.supplier" | translate }}</mat-label>
          <mat-select formControlName="supplierId" required>
            @if (suppliers.length > 0) {
              @for (supplier of suppliers; track supplier.id) {
                <mat-option [value]="supplier.id">{{ supplier.name }}</mat-option>
              }
            } @else {
              <mat-option disabled>No se encontraron proveedores</mat-option>
            }
          </mat-select>
          @if(controlHasError('supplierId', 'required')){
            <mat-error>
              * {{ "RECHARGES.BUY.errors.supplier" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="recharge__matfield">
          <mat-label>{{ "RECHARGES.BUY.FORM.labels.cellphone" | translate }}</mat-label>
          <input matInput type="text" formControlName="cellPhone" required>
          @if(controlHasError('cellPhone', 'required')){
            <mat-error>
              * {{ "RECHARGES.BUY.errors.cellPhone" | translate }}
            </mat-error>
          }
          @if(controlHasError('cellPhone', 'invalidCellPhone')){
            <mat-error>
              * {{ "RECHARGES.BUY.errors.cellphone_valid" | translate }}
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="recharge__matfield">
          <mat-label>{{ "RECHARGES.BUY.FORM.labels.value" | translate }}</mat-label>
          <input matInput type="number" formControlName="value" required>
          @if(controlHasError('value', 'required')){
            <mat-error>
              * {{ "RECHARGES.BUY.errors.value" | translate }}
            </mat-error>
          }
          @if(controlHasError('value', 'invalidValue')){
            <mat-error>
              * {{ "RECHARGES.BUY.errors.value_min_max" | translate }}
            </mat-error>
          }
        </mat-form-field>

      </div>

        <button mat-raised-button color="primary" type="submit" [disabled]="rechargeForm.invalid">
          {{ "RECHARGES.BUY.FORM.text_btn" | translate }}
        </button>

      </form>
    </div>

  `,
  styleUrl: './create-recharge.component.scss'
})
export class CreateRechargeComponent implements OnInit {

  rechargeForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private rechargeSvc = inject(RechargeService);
  private authSvc = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  suppliers: SupplierResponse[] = [];

  ngOnInit(): void {
    this.rechargeForm = this.formBuilder.group({
      supplierId: ['', Validators.required],
      cellPhone: ['', [Validators.required, cellPhoneValidator()]],
      value: ['', [Validators.required, valueValidator()]],
    });
    this.getSuppliers();
  }

  controlHasError(control: string, error: string) {
    return this.rechargeForm.controls[control].hasError(error);
  }

  getSuppliers(){
    this.rechargeSvc.getSuppliers().subscribe(res => {
      this.suppliers = res;
    });
  }

  getSupplierById(id: string){
    const supplier = this.suppliers.find(supplier => supplier.id === id);
    return supplier ? supplier.name : 'Supplier not found';
  }

  onSubmit(){
    if (this.rechargeForm.valid) {
      const { supplierId, cellPhone, value } = this.rechargeForm.value;
      
      const rechargeData: RechargeCreate = {
        userId: this.authSvc.getUserId(),
        supplierId,
        cellPhone,
        value
      }

      this.rechargeSvc.buyRecharge(rechargeData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.transactionalID) {
            const newRes = { ...res, supplierName: this.getSupplierById(res.supplierId)};
            const dialogRef = this.openDialog(newRes);

            dialogRef.afterClosed().subscribe(() => {
              this.rechargeForm.reset();
              this.router.navigate(['recharges/all-recharges']);
            });
          }
        },
        error: (error) => {
          console.error('Error en la recarga:', error);
        },
      });
    }
  }

  openDialog(data:any){
    return this.dialog.open(RechargeDetailDialogComponent, { width: '400px', data: data});
  }



}
