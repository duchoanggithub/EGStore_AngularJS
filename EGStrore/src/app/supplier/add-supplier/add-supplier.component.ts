import { Component } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent  {

  addsupForm: FormGroup;
  addSup: any;

  constructor(
    private dialogRef: MatDialogRef<AddSupplierComponent>,
    private fb: FormBuilder, 
    private supSV: SupplierService
  ) {
    this.addsupForm = this.fb.group({
      supName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phoneContact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      createDay: [this.getCurrentDateTime(), Validators.required],
      updateDay: [this.getCurrentDateTime(), Validators.required],
      isActive: [false]
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addsupForm.valid) {
      const newSupplier = this.addsupForm.value;
      this.supSV.addSup(newSupplier).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newSupplier)
        this.dialogRef.close(true);
      })
      
    }
  }
}


