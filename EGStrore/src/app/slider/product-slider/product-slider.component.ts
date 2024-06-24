import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnInit {
  products: any[] = [];
  supId = 'bc7199ba-8373-423b-a67f-4c69bf2b95f2'; 
  currentSlide = 0;
  slideWidth = 100;
  itemsPerPage = 3;

  constructor(private prodSV: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.prodSV.getListProductBySupId(this.supId).subscribe(
      (data) => {
        this.products = this.chunkProducts(data, this.itemsPerPage);
        this.updateSlidePosition();
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  chunkProducts(products: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }
    return chunks;
  }

  nextSlide(): void {
    if (this.currentSlide < this.products.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Quay lại slide đầu tiên
    }
    this.updateSlidePosition();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.products.length - 1; // Quay lại slide cuối cùng
    }
    this.updateSlidePosition();
  }

  updateSlidePosition(): void {
    const transformValue = -this.currentSlide * this.slideWidth;
    const productWrapper = document.querySelector('.product-wrapper') as HTMLElement;
    if (productWrapper) {
      productWrapper.style.transform = `translateX(${transformValue}%)`;
    }
  }
}