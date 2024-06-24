import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  post(arg0: string, deliSV: DeliveryService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListDelivery(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Delivery/LayTatCa')
  }

  addDelivery(newDeli: any): Observable<any> {
    const url = 'http://localhost:5144/api/Delivery/Them';
    return this.http.post<any>(url, newDeli);
  }
  getDeliveryById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Delivery/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteDelivery(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Delivery/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateDelivery(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Delivery/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(

      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
