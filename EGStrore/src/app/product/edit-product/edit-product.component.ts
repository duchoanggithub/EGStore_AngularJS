import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  EditForm!: FormGroup;
  id: string | null;
  cates: any[] = [];
  sups: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private prodSV: ProductService,
    private supSV: SupplierService,
    private categorySV: CategoryService,
    private toastr: ToastrService,
    private router: Router) {
    this.id = null;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.EditForm = this.fb.group({
      categoryId: [''],
      supId: [''],
      prodCode: [''],
      prodName: [''],
      price: [''],
      discount: [''],
      inventory: [''],
      prodImg: [''],
      color: [''],
      origin: [''],
      sex: [false],
      designs: [''],
      frameMaterial: [''],
      suitable: [''],
      describe: [''],
      uv: [false],
      createDay: [''],
      updateDay: [this.getCurrentDateTime()],
      status: [false],
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
      this.prodSV.getProductById(this.id).subscribe({
        next: (PData) => {
          if (PData) {
            this.EditForm.patchValue({
              categoryId: PData.categoryId,
              supId: PData.supId,
              prodCode: PData.prodCode,
              prodName: PData.prodName,
              price: PData.price,
              discount: PData.discount,
              inventory: PData.inventory,
              prodImg: PData.prodImg,
              color: PData.color,
              origin: PData.origin,
              sex: PData.sex,
              designs: PData.designs,
              frameMaterial: PData.frameMaterial,
              suitable: PData.suitable,
              describe: PData.describe,
              uv: PData.uv,
              createDay: PData.createDay,
              status: PData.status,
            });
            console.log('Dữ liệu nhận được từ API:', PData);
          } else {
            console.error('Không tìm thấy sản phẩm với id:', this.id);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
      // Lấy danh sách vai trò
      this.supSV.getListSup().subscribe({
        next: (sups) => {
          this.sups = sups;
        },
        error: (error) => {
          console.error('Lỗi khi tải danh sách nhà tài trợ', error);
        }
      });
      this.categorySV.getListCategory().subscribe({
        next: (cates) => {
          this.cates = cates;
        },
        error: (error) => {
          console.error('Lỗi khi tải danh sách loại sản phẩm', error);
        }
      });
    } else {
      console.error('Không thể tải dữ liệu sản phẩm');
    }
  }

  onSubmit() {
    if (this.EditForm.valid && this.id !== null) {
      const updateData = this.EditForm.value;
      updateData.sex = updateData.sex === 'true'; 
      updateData.uv = updateData.uv === 'true'; 
      this.prodSV.updateProduct(this.id, updateData).subscribe({
        next: () => {
          console.log('Cập nhật sản phẩm thành công', updateData);
          this.toastr.success('Sửa sản phẩm thành công', 'Thành công', { timeOut: 3000 });
          this.router.navigate(['product']);
        },
        error: (error) => {
          console.error('Lỗi cập nhật:', error);
          this.toastr.error('Đã xảy ra lỗi khi cập nhật sản phẩm', 'Lỗi');
        }
      });
    } else {
      console.error('Không thể cập nhật sản phẩm với id là null.');
    }
  }

  closeEdit(): void {
    this.router.navigate(['product']);
  }

}
