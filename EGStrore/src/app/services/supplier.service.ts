import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  post(arg0: string, supSV: SupplierService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListSup(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Supplier/LayTatCa')
  }

  addSup(newSupplier: any): Observable<any> {
    const url = 'http://localhost:5144/api/Supplier/Them';
    return this.http.post<any>(url, newSupplier);
  }
  getSupplierById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Supplier/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteSup(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Supplier/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateSup(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Supplier/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
