import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  adduserForm: FormGroup;
  roles: any[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder,
    private userSV: UserService,
    private toastr: ToastrService,
    private roleSV: RoleService,
  ) {
    this.adduserForm = this.fb.group({
      roleId: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['',],
      name: [''],
      phone: [''],
      address: [''],
      sex: [true],
      isActive: [false],
    });
  }

  ngOnInit(): void {
   this.roleSV.getListRole().subscribe(roles => {
      this.roles = roles;
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  onSubmit(): void {
    if (this.adduserForm.valid) {
      const newUser = this.adduserForm.value;
      newUser.sex = newUser.sex === 'true';
      console.log("Dữ liệu gửi đi:", newUser); // In ra dữ liệu được gửi đi để kiểm tra
      this.userSV.addUser(newUser).subscribe(res => {
        console.log("Thêm người dùng thành công:", res); // In ra kết quả từ máy chủ
      }, error => {
        console.error("Lỗi khi thêm người dùng:", error); // In ra lỗi nếu có
      });
      this.dialogRef.close(true);
    }
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}


