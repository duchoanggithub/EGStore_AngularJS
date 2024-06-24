import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categorySV: CategoryService,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      cateProdName: [''],
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
      this.categorySV.getCategoryById(this.id).subscribe({
        next: (RData) => {
          if (RData) {
            this.EditForm.patchValue({
              cateProdName: RData.cateProdName,
              describe: RData.describe,
              createDay: RData.createDay, 
              isActive: RData.isActive,
            });
            console.log('Dữ liệu nhận được từ API:', RData);
          } else {
            console.error('Không tìm thấy loại sản phẩm với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu loại sản phẩm.');
    }
  }

  onSubmit() {
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      this.categorySV.updateCategory(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật loại sản phẩm thành công', updateData);
          this.toastr.success('Sửa loại sản phẩm thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['category']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật loại sản phẩm', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật loại sản phẩm với id là null.');
    }
  }

  closeEdit(): void {
    this.router.navigate(['category']);
  }

}

