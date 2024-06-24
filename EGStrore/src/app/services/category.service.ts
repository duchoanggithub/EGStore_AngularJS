import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  post(arg0: string, categorySV: CategoryService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListCategory(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Category/LayTatCa')
  }

  addCategory(newCate: any): Observable<any> {
    const url = 'http://localhost:5144/api/Category/Them';
    return this.http.post<any>(url, newCate);
  }
  getCategoryById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Category/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteCategory(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Category/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateCategory(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Category/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
