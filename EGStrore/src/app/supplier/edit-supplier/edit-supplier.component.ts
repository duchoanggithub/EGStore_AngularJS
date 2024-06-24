import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css'
})
export class EditSupplierComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private supSV: SupplierService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      
      supName: [''],
      contactPerson: [''],
      phoneContact: [''],
      address: [''],
      email: [''],
      createDay: [this.getCurrentDateTime(), Validators.required],
      updateDay: [this.getCurrentDateTime(), Validators.required],
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
      this.supSV.getSupplierById(this.id).subscribe({
        next: (SData) => {
          if (SData) {
            this.EditForm.patchValue({
              supName: SData.supName,
              contactPerson: SData.contactPerson,
              phoneContact: SData.phoneContact,
              address: SData.address,
              email: SData.email,
              isActive: SData.isActive
            });
            console.log('Dữ liệu nhận được từ API:', SData);
          } else {
            console.error('Không tìm thấy nhà cung cấp với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu nhà cung cấp.');
    }
  }

  onSubmit(){
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      this.supSV.updateSup(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật nhà cung cấp thành công', updateData);
          this.toastr.success('Sửa nhà cung cấp thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['supplier']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật nhà cung cấp', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật nhà cung cấp với id là null.');
    } 
  }

  closeEdit(): void {
    this.router.navigate(['supplier']);
  }

}
