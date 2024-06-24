import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css',
  providers: [DatePipe]
})
export class DetailUserComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userSV: UserService,
    private roleSV: RoleService,
    private router: Router,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getUserById(id);
    } else {
      console.error('Không có ID được cung cấp.');
    }
  }

  getUserById(id: string): void {
    this.userSV.getUserById(id).subscribe({
      next: (UData) => {
        if (UData) {
          UData.birthDay = this.datePipe.transform(UData.birthDay, 'yyyy-MM-dd');
          this.user = UData;
          console.log('Dữ liệu nhận được từ API:', UData);
          this.getRoleByIdAndSetRoleName(UData.roleId);
        } else {
          console.error('Không tìm thấy người dùng với id:', id);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRoleByIdAndSetRoleName(roleId: string): void {
    this.roleSV.getRoleById(roleId).subscribe({
      next: (roleData) => {
        if (roleData) {
          this.user.roleName = roleData.roleName;
        } else {
          console.error('Không tìm thấy vai trò với id:', roleId);
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin vai trò:', error);
      }
    });
  }

  closeDetail(): void {
    this.router.navigate(['user']);
  }

}
