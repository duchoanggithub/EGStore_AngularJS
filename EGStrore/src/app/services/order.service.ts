import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  post(arg0: string, orderSV: OrderService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListOrder(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Order/LayTatCa')
  }

  addOrder(newOrder: any): Observable<any> {
    const url = 'http://localhost:5144/api/Order/Them';
    return this.http.post<any>(url, newOrder);
  }
  getOrderById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Order/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteOrder(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Order/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateOrder(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Order/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
