import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { SupplierService } from '../services/supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  prods: any = [];
  displayedColumns: string[] = ['stt', 'categoryName', 'supName', 'prodImg', 'prodName', 'price', 'inventory', 'designs', 'status', 'actions'];

  constructor(
    private prodSV: ProductService,
    private categorySV: CategoryService,
    private supSV: SupplierService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {
   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.prodSV.getListProduct().subscribe(res => {
      this.categorySV.getListCategory().subscribe(cates => {
        this.supSV.getListSup().subscribe(sups => {
          this.prods = res.map((prod: any) => {
            const cate = cates.find((cate: any) => cate.id === prod.categoryId);
            const sup = sups.find((sup: any) => sup.id === prod.supId);
            return {
              ...prod,
              categoryName: cate ? cate.cateProdName : '',
              supName: sup ? sup.supName : ''
            };
          });
          this.prods = new MatTableDataSource(this.prods);
          this.prods.paginator = this.paginator;
          this.prods.sort = this.sort;
        });
      });
    });
  }
  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm người dùng thành công', 'Thành công');
      }
    });
  }

  deleteProduct(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (confirmed) {
      this.prodSV.deleteProduct(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa nhà cung cấp thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}