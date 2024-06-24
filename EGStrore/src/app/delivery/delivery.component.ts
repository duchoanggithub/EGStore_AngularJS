import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryService } from '../services/delivery.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {

  deliverys: any = [];
  displayedColumns: string[] = ['id', 'deliveryName', 'deliPhone', 'createDay', 'updateDay', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private deliSV: DeliveryService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách chi nhánh
    this.deliSV.getListDelivery().subscribe(res => {
      this.deliverys = res;
      this.deliverys = new MatTableDataSource(this.deliverys)
      this.deliverys.paginator = this.paginator;
      this.deliverys.sort = this.sort;
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm đơn vị chuyển phát thành công', 'Thành công');
      }
    });
  }

  deleteDelivery(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa đơn vị chuyển phát này không?');
    if (confirmed) {
      this.deliSV.deleteDelivery(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa đơn vị chuyển phát thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}

