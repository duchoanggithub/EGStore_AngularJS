import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roleSV: RoleService,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      roleName: [''],
      describe: [''],
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
      this.roleSV.getRoleById(this.id).subscribe({
        next: (RData) => {
          if (RData) {
            this.EditForm.patchValue({
              roleName: RData.roleName,
              describe: RData.describe,
              createDay: RData.createDay, 
              isActive: RData.isActive,
            });
            console.log('Dữ liệu nhận được từ API:', RData);
          } else {
            console.error('Không tìm thấy quyền với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu quyền.');
    }
  }

  onSubmit() {
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      this.roleSV.updateRole(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật quyền thành công', updateData);
          this.toastr.success('Sửa quyền thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['role']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật quyền', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật quyền với id là null.');
    }
  }

  closeEdit(): void {
    this.router.navigate(['role']);
  }

}
