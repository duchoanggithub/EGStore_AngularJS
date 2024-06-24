import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { CategoryService } from '../../services/category.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private prodSV: ProductService,
    private supSV: SupplierService,
    private categorySV: CategoryService,
    private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProductById(id);
    } else {
      console.error('Không có ID được cung cấp.');
    }
  }

  getProductById(id: string): void {
    this.prodSV.getProductById(id).subscribe({
      next: (PData) => {
        if (PData) {
          this.product = PData;
          console.log('Dữ liệu nhận được từ API:', PData);
          this.getCategoryById(PData.categoryId);
          this.getSupplierById(PData.supId);
        } else {
          console.error('Không tìm thấy người dùng với id:', id);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getSupplierById(supId: string): void {
    this.supSV.getSupplierById(supId).subscribe({
      next: (supData) => {
        if (supData) {
          this.product.supName = supData.supName;
        } else {
          console.error('Không tìm thấy loại hàng với id:', supId);
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin loại hàng:', error);
      }
    });
  }

  getCategoryById(categoryId: string): void {
    this.categorySV.getCategoryById(categoryId).subscribe({
      next: (cateData) => {
        if (cateData) {
          this.product.cateProdName = cateData.cateProdName;
        } else {
          console.error('Không tìm thấy loại hàng với id:', categoryId);
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin loại hàng:', error);
      }
    });
  }

  closeDetail(): void {
    this.router.navigate(['product']);
  }

}
