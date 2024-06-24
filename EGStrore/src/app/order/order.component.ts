import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddOrderComponent } from './add-order/add-order.component';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orders: any = [];
  displayedColumns: string[] = ['id', 'cusName', 'cusPhone', 'email', 'address',
    'paymentMenthods', 'deliveryName', 'orderDate', 'deliveryDate', 'status', 'actions'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderSV: OrderService,
    private deliSV: DeliveryService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách chi nhánh
    this.orderSV.getListOrder().subscribe(res => {
      this.deliSV.getListDelivery().subscribe(deliverys => {
        this.orders = res.map((order: any) => {
          const delivery = deliverys.find((delivery: any) => delivery.id === order.deliveryId);
          return {
            ...order,
            deliveryName: delivery ? delivery.deliveryName : delivery.id
          };
        });
        this.orders = new MatTableDataSource(this.orders)
        this.orders.paginator = this.paginator;
        this.orders.sort = this.sort;
      });
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddOrderComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm đơn hàng thành công', 'Thành công');
      }
    });
  }

  deleteOrder(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?');
    if (confirmed) {
      this.orderSV.deleteOrder(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa đơn hàng thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}
