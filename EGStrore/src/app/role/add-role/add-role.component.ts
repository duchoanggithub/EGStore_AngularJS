import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent  {

  addroleForm!: FormGroup;
  roles: any[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<AddRoleComponent>,
    private fb: FormBuilder,
    private roleSV: RoleService,
    private toastr: ToastrService,
  ) {
    this.addroleForm = this.fb.group({
      roleName: ['', Validators.required],
      describe: ['', Validators.required],
      createDay: [this.getCurrentDateTime(),],
      updateDay: [this.getCurrentDateTime(),],
      isActive: [false]
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  

  onSubmit(): void {
    if (this.addroleForm.valid) {
      const newRole = this.addroleForm.value;
      this.roleSV.addRole(newRole).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newRole)
        this.dialogRef.close(true);
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}