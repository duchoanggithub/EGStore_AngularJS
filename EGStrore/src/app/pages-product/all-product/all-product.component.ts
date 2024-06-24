import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit {
  products!: any[];
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct: any;
  filteredProducts: any[] = [];
  cates: any[] = []; 
  sups: any[] = []; 
  selectedCategories: Set<string> = new Set();
  selectedSuppliers: Set<string> = new Set();

  constructor(
    private prodSV: ProductService,
    private categorySV: CategoryService,
    private supSV: SupplierService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories(); 
    this.getSuppliers();
  }

  getAllProducts(): void {
    this.prodSV.getListProduct().subscribe(
      (data: any) => {
        this.products = data;
        this.filteredProducts = data;
        this.totalProduct = data.lenght;
      },
    );
  }

  getCategories(): void {
    this.categorySV.getListCategory().subscribe((data: any) => {
      this.cates = data;
    });
  }

  getSuppliers(): void {
    this.supSV.getListSup().subscribe((data: any) => {
      this.sups = data;
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

    if (this.selectedCategories.size > 0) {
      filtered = filtered.filter(product => this.selectedCategories.has(product.categoryId));
    }

    if (this.selectedSuppliers.size > 0) {
      filtered = filtered.filter(product => this.selectedSuppliers.has(product.supId));
    }

    this.filteredProducts = filtered;
  }
}
