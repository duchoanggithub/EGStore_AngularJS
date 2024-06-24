import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../services/supplier.service';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  sups: any = [];
  displayedColumns: string[] = ['stt', 'supName', 'contactPerson', 'phoneContact', 'address', 'email', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private supSV: SupplierService, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách chi nhánh
    this.supSV.getListSup().subscribe(res => {
      this.sups = res;
      this.sups = new MatTableDataSource(this.sups)
      this.sups.paginator = this.paginator;
      this.sups.sort = this.sort;
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddSupplierComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm nhà cung cấp thành công', 'Thành công');
      }
    });
  }
  deleteSup(id: string): void {
    this.supSV.deleteSup(id).subscribe(res => {
      this.getAll();
      console.log('Xóa thành công', res);
      this.toastr.success('Xóa nhà cung cấp thành công', 'Thành công');
    });
  }
}
