import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-categoryprod',
  templateUrl: './detail-categoryprod.component.html',
  styleUrl: './detail-categoryprod.component.css'
})
export class DetailCategoryprodComponent implements OnInit {
  product: any;
  quantity: number = 1;

  // Khai báo biến cho vị trí của Snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private route: ActivatedRoute,
    private prodSV: ProductService,
    private categorySV: CategoryService,
    private supSV: SupplierService,
    private cartSV: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: any): void {
    this.cartSV.addToCart({ ...product, quantity: this.quantity });
    // Hiển thị thông báo với tên sản phẩm và số lượng
    this.snackBar.open(`Đã thêm ${this.quantity} ${product.prodName} vào giỏ hàng!`, 'Đóng', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
