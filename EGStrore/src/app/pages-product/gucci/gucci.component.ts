import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-gucci',
  templateUrl: './gucci.component.html',
  styleUrl: './gucci.component.css'
})
export class GucciComponent implements OnInit {
  products: any[] = [];
  supId!: string;
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct: any;
  filteredProducts: any[] = [];
  cates: any[] = []; 
  sups: any[] = []; 
  selectedCategories: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categorySV: CategoryService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.supId = '78455d00-4821-4337-8b05-f171786cffe2';
      this.loadProducts();
      this.getCategories(); ;
    });
  }

  loadProducts(): void {
    if (this.supId) {
      this.productService.getListProductBySupId(this.supId).subscribe(
        (data) => {
          this.products = data;
          this.filteredProducts = data;
          this.totalProduct = data.lenght;
        },
        (error) => {
          console.error('Failed to load products:', error);
        }
      );
    }
  }

  getCategories(): void {
    this.categorySV.getListCategory().subscribe((data: any) => {
      this.cates = data;
    });
  }

  onCategoryChange(event: any, categoryId: string): void {
    if (event.checked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    let filtered = this.products;

    if (this.selectedCategories.size > 0) {
      filtered = filtered.filter(product => this.selectedCategories.has(product.categoryId));
    }

    this.filteredProducts = filtered;
  }
}

