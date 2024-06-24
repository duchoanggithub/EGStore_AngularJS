import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
  post(arg0: string, opSV: OrderProductService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListOP(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/OrderProduct/LayTatCa')
  }

  // Phương thức để lấy tổng tiền của tất cả các OrderProduct
  getTotalSum(): Observable<number> {
    return this.http.get<any[]>('http://localhost:5144/api/OrderProduct/LayTatCa').pipe(
      map(orderProducts => {
        // Tính tổng tiền từ trường Sum của mỗi OrderProduct
        const totalSum = orderProducts.reduce((total, orderProduct) => total + (orderProduct.sum || 0), 0);
        return totalSum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      })
    );
  }

  addOP(newOrderProduct: any): Observable<any> {
    const url = 'http://localhost:5144/api/OrderProduct/Them';
    // Tính tổng tiền cho đơn hàng sản phẩm
    newOrderProduct.Sum = newOrderProduct.Amount * newOrderProduct.UnitPrice;
    return this.http.post<any>(url, newOrderProduct);
  }
  
  getOPById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/OrderProduct/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteOP(id: string): Observable<any> {
    const url = `http://localhost:5144/api/OrderProduct/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateOP(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/OrderProduct/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
