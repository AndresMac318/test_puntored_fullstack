import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RechargeService } from '../../services/recharge.service';
import { RechargeItem } from '../../interfaces/rechargeItem.interface';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-recharges',
  imports: [ 
    TranslatePipe,  
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="rechargeall">
      <h2 class="rechargeall__title">{{ "RECHARGES.LIST_ALL.title" | translate }}</h2>
      <div>
      
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Buscar por celular</mat-label>
        <input matInput [(ngModel)]="searchTerm" (input)="applyFilter()" placeholder="Ej: 3001234567">
      </mat-form-field>

      @if(recharges.length > 0){
        <table mat-table [dataSource]="dataSource" class="recharge__table">
  
            <ng-container matColumnDef="cellPhone">
              <th mat-header-cell *matHeaderCellDef>Celular</th>
              <td mat-cell *matCellDef="let recharge">{{ recharge.cellPhone }}</td>
            </ng-container>
  
            <ng-container matColumnDef="supplierId">
              <th mat-header-cell *matHeaderCellDef>Proveedor</th>
              <td mat-cell *matCellDef="let recharge">{{ getSupplierNameById(recharge.supplierId) }}</td>
            </ng-container>
  
  
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>Valor</th>
              <td mat-cell *matCellDef="let recharge">{{ recharge.value | currency }}</td>
            </ng-container>
  
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Fecha</th>
              <td mat-cell *matCellDef="let recharge">{{ recharge.createdAt | date: 'short' }}</td>
            </ng-container>
  
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Estado</th>
              <td mat-cell *matCellDef="let recharge">{{ recharge.status }}</td>
            </ng-container>
  
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      
        <mat-paginator [pageSizeOptions]="[5, 8, 10]" [pageSize]="8" showFirstLastButtons></mat-paginator>
      }

      @if (recharges.length == 0) {
        <div class="noresults">
          No hay elementos para mostrar
        </div>
      }

      </div>
    </div>
  `,
  styleUrl: './all-recharges.component.scss'
})
export class AllRechargesComponent implements OnInit {
  
  private rechargesSvc = inject(RechargeService);
  public recharges: RechargeItem[] = [];

  public dataSource = new MatTableDataSource<RechargeItem>([]);
  public displayedColumns: string[] = [ 'supplierId', 'cellPhone', 'value', 'createdAt', 'status'];
  public searchTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.rechargesSvc.getMyRecharges().subscribe(res => {
      this.recharges = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator; 
    })
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  getSupplierNameById(id: string): string {
    const suppliers = [
      { id: '8753', name: 'Claro' },
      { id: '9773', name: 'Movistar' },
      { id: '3398', name: 'Tigo' },
      { id: '4689', name: 'Wom' },
    ];
    const supplier = suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : 'Proveedor no encontrado';
  }

}
