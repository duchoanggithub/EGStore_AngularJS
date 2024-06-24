import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  addcategoryForm!: FormGroup;
  cates: any[] = [];
  
  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private fb: FormBuilder,
    private categorySV: CategoryService,
    private toastr: ToastrService,
  ) {
    this.addcategoryForm = this.fb.group({
      cateProdName: ['', Validators.required],
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
    if (this.addcategoryForm.valid) {
      const newCatefory = this.addcategoryForm.value;
      this.categorySV.addCategory(newCatefory).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newCatefory)
        this.dialogRef.close(true);
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
