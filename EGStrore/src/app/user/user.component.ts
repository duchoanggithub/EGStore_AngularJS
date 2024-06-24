import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddUserComponent } from './add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../services/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: any = [];
  displayedColumns: string[] = ['id', 'roleName', 'userName', 'email', 'name', 'status', 'actions'];

  constructor(
    private userSV: UserService,
    private roleSV: RoleService,
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
    this.userSV.getListUser().subscribe(res => {
      this.roleSV.getListRole().subscribe(roles => {
          this.users = res.map((user: any) => {
          const role = roles.find((role: any) => role.id === user.roleId);
          return {
            ...user,
            roleName: role ? role.roleName : role.id
          };
        });
        this.users = new MatTableDataSource(this.users)
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
        
      });
    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm người dùng thành công', 'Thành công');
      }
    });
  }

  deleteUser(id: string): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
    if (confirmed) {
      this.userSV.deleteUser(id).subscribe(res => {
        this.getAll();
        console.log('Xóa thành công', res);
        this.toastr.success('Xóa nhà cung cấp thành công', 'Thành công');
      });
    } else {
      console.log('Hủy xóa');
    }
  }
}