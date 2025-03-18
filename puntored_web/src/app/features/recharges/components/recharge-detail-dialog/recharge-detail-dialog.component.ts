import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-recharge-detail-dialog',
  imports: [ MatDialogModule, MatButtonModule, CurrencyPipe ],
  template: `
    <h2 mat-dialog-title>Detalles de la recarga</h2>
    <mat-dialog-content>
      <p><strong>ID:</strong> {{ data.id }}</p>
      <p><strong>Proveedor:</strong> {{ data.supplierName }}</p>
      <p><strong>Celular:</strong> {{ data.cellPhone }}</p>
      <p><strong>Valor:</strong> {{ data.value | currency }}</p>
      <p><strong>Mensaje:</strong> {{ data.message }}</p>
      <p><strong>ID Ticket:</strong> {{ data.transactionalID }}</p>
      <p><strong>Estado:</strong> {{ data.status }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close type="button">Cerrar</button>
    </mat-dialog-actions>
  `,
  styleUrl: './recharge-detail-dialog.component.scss'
})
export class RechargeDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RechargeDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

}
