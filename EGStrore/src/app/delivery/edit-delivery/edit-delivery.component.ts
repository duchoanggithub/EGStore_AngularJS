import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrl: './edit-delivery.component.css'
})
export class EditDeliveryComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deliSV: DeliveryService,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      deliveryName: [''],
      deliPhone: [''],
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
      this.deliSV.getDeliveryById(this.id).subscribe({
        next: (RData) => {
          if (RData) {
            this.EditForm.patchValue({
              deliveryName: RData.deliveryName,
              deliPhone: RData.deliPhone,
              createDay: RData.createDay, 
              isActive: RData.isActive,
            });
            console.log('Dữ liệu nhận được từ API:', RData);
          } else {
            console.error('Không tìm thấy đơn vị chuyển phát với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu đơn vị chuyển phát.');
    }
  }

  onSubmit() {
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      this.deliSV.updateDelivery(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật đơn vị chuyển phát thành công', updateData);
          this.toastr.success('Sửa đơn vị chuyển phát thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['delivery']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật đơn vị chuyển phát', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật đơn vị chuyển phát với id là null.');
    }
  }

  closeEdit(): void {
    this.router.navigate(['delivery']);
  }

}
