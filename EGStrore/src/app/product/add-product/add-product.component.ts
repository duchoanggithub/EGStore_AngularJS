import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  addprodForm: FormGroup;
  addProduct: any;
  cates: any[] = [];
  sups: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private fb: FormBuilder,
    private prodSV: ProductService,
    private categorySV: CategoryService,
    private supSV: SupplierService,
    private toastr: ToastrService,
  ) {
    this.addprodForm = this.fb.group({
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
      sex: [''],
      designs: [''],
      frameMaterial: [''],
      suitable: [''],
      describe: [''],
      uv: [''],
      createDay: [this.getCurrentDateTime()],
      updateDay: [this.getCurrentDateTime()],
      status: [false],
    });
  }


  ngOnInit(): void {
    this.categorySV.getListCategory().subscribe(cates => {
      this.cates = cates;
    });
    this.supSV.getListSup().subscribe(sups => {
      this.sups = sups;
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }

  onSubmit(): void {
    if (this.addprodForm.valid) {
      const newProd = this.addprodForm.value;
      newProd.sex = newProd.sex === 'true'; // Chuyển đổi giá trị của radio button giới tính thành boolean
      newProd.uv = newProd.uv === 'true'; // Chuyển đổi giá trị của radio button UV thành boolean
      console.log('Dữ liệu gửi đi:', newProd);
      this.prodSV.addProduct(newProd).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newProd)
        this.dialogRef.close(true);
      })

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

