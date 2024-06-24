import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;
  roles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userSV: UserService,
    private roleSV: RoleService,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      roleId: [''],
      userName: [''],
      password: [''],
      email: [''],
      name: [''],
      createDay: [''],
      updateDay: [this.getCurrentDateTime()],
      isActive: [false],
      id: this.id
    });
    this.loadDataForEdit();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  loadDataForEdit(): void {
    if (this.id !== null) {
      this.userSV.getUserById(this.id).subscribe({
        next: (UData) => {
          if (UData) {
            this.EditForm.patchValue({
              roleId: UData.roleId,
              userName: UData.userName,
              password: UData.password,
              email: UData.email,
              name: UData.name,
              createDay: UData.createDay, 
              isActive: UData.isActive,
            });
            console.log('Dữ liệu nhận được từ API:', UData);
          } else {
            console.error('Không tìm thấy người dùng với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
      // Lấy danh sách vai trò
      this.roleSV.getListRole().subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: (error) => {
          console.error('Lỗi khi tải danh sách vai trò:', error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu người dùng.');
    }
  }

  onSubmit() {
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      this.userSV.updateUser(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật người dùng thành công', updateData);
          this.toastr.success('Sửa người dùng thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['user']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật người dùng', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật người dùng với id là null.');
    }
  }

  closeEdit(): void {
    this.router.navigate(['user']);
  }

}