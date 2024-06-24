import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  post(arg0: string, prodSV: ProductService) {
    throw new Error('Method not implemented.');
  }

  //chia sẻ event chọn danh mục giữa các component
  private categorySelectedSource = new Subject<string>();
  categorySelected$ = this.categorySelectedSource.asObservable();

  selectCategory(categoryId: string): void {
    this.categorySelectedSource.next(categoryId);
  }

  //chia sẻ event chọn danh mục giữa các component
  private supSelectedSource = new Subject<string>();
  supSelected$ = this.supSelectedSource.asObservable();

  selectSup(supId: string): void {
    this.supSelectedSource.next(supId);
  }

  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListProduct(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Product/LayTatCa')
  }

  getListProductByCategoryId(categoryId: string): Observable<any> {
    const url = `http://localhost:5144/api/Product/LayTheoCategoryId/${categoryId}`;
    return this.http.get<any>(url);
  }

  getListProductBySupId(supId: string): Observable<any> {
    const url = `http://localhost:5144/api/Product/LayTheoSupId/${supId}`;
    return this.http.get<any>(url);
  }

  addProduct(newProd: any): Observable<any> {
    const url = 'http://localhost:5144/api/Product/Them';
    return this.http.post<any>(url, newProd);
  }
  getProductById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Product/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  searchProduct(keyword: string): Observable<any> {
    const url = `http://localhost:5144/api/Product/Search`;
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<any>(url, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        return throwError(() => new Error('Lỗi khi tìm kiếm sản phẩm'));
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Product/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateProduct(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Product/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
