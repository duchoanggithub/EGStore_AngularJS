import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-glasses-product',
  templateUrl: './glasses-product.component.html',
  styleUrl: './glasses-product.component.css'
})
export class GlassesProductComponent implements OnInit {
  products: any[] = [];
  categoryId!: string;
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct: any;
  filteredProducts: any[] = [];
  sups: any[] = [];
  selectedSuppliers: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private supSV: SupplierService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = '8fce5d50-4501-48f5-9637-dd4034e7db5c';
      this.loadProducts();
      this.getSuppliers();
    });
  }

  loadProducts(): void {
    if (this.categoryId) {
      this.productService.getListProductByCategoryId(this.categoryId).subscribe(
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

  getSuppliers(): void {
    this.supSV.getListSup().subscribe((data: any) => {
      this.sups = data;
    });
  }

  onSupplierChange(event: any, supId: string): void {
    if (event.checked) {
      this.selectedSuppliers.add(supId);
    } else {
      this.selectedSuppliers.delete(supId);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    let filtered = this.products;

    if (this.selectedSuppliers.size > 0) {
      filtered = filtered.filter(product => this.selectedSuppliers.has(product.supId));
    }

    this.filteredProducts = filtered;
  }
}
