import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { AddRoleComponent } from './add-role/add-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {

  roles: any = [];
  displayedColumns: string[] = ['id', 'roleName', 'describe', 'createDay', 'updateDay', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleSV: RoleService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách chi nhánh
    this.roleSV.getListRole().subscribe(res => {
      this.roles = res;
      this.roles = new MatTableDataSource(this.roles)
      this.roles.paginator = this.paginator;
      this.roles.sort = this.sort;
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
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

  deleteRole(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa vai trò này không?');
    if (confirmed) {
      this.roleSV.deleteRole(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa nhà cung cấp thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}
