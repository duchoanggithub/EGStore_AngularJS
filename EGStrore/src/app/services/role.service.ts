import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  post(arg0: string, roleSV: RoleService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListRole(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Role/Laytatca')
  }

  addRole(newRole: any): Observable<any> {
    const url = 'http://localhost:5144/api/Role/Them';
    return this.http.post<any>(url, newRole);
  }
  getRoleById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Role/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteRole(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Role/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  updateRole(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Role/CapNhat/`+ id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(
      
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}