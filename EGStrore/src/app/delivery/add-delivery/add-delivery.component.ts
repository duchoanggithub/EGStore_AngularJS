import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.css'
})
export class AddDeliveryComponent {

  adddeliveryForm!: FormGroup;
  deliverys: any[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private fb: FormBuilder,
    private deliSV: DeliveryService,
    private toastr: ToastrService,
  ) {
    this.adddeliveryForm = this.fb.group({
      deliveryName: ['', Validators.required],
      deliPhone: ['', Validators.required],
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
    if (this.adddeliveryForm.valid) {
      const newDeli = this.adddeliveryForm.value;
      this.deliSV.addDelivery(newDeli).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newDeli)
        this.dialogRef.close(true);
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

