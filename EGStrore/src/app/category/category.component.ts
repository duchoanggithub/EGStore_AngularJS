import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  cates: any = [];
  displayedColumns: string[] = ['id', 'cateProdName', 'describe', 'createDay', 'updateDay', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categorySV: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách chi nhánh
    this.categorySV.getListCategory().subscribe(res => {
      this.cates = res;
      this.cates = new MatTableDataSource(this.cates)
      this.cates.paginator = this.paginator;
      this.cates.sort = this.sort;
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm loại hàng thành công', 'Thành công');
      }
    });
  }

  deleteCategory(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa loại hàng này không?');
    if (confirmed) {
      this.categorySV.deleteCategory(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa loại hàng thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}
