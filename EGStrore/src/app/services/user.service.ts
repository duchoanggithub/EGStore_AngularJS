import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  post(arg0: string, userSV: UserService) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

//các phương thức khác 
getListUser(): Observable<any> {
  return this.http.get<any>('http://localhost:5144/api/User/LayTatCa')
}

addUser(newUser: any): Observable<any> {
  const url = 'http://localhost:5144/api/User';
  return this.http.post<any>(url, newUser);
}
getUserById(id: string): Observable<any> {
  const url = `http://localhost:5144/api/User/TimKiem/${id}`;
  return this.http.get<any>(url);
}

getUserByUserName(userName: string): Observable<any> {
  const url = `http://localhost:5144/api/User/GetUserByUserName?userName=${userName}`;
  return this.http.get<any>(url);
}

deleteUser(id: string): Observable<any> {
  const url = `http://localhost:5144/api/User/Xoa/${id}`;
  return this.http.delete<any>(url);
}

updateUser(id: string, updatedData: any): Observable<any> {
  const url = `http://localhost:5144/api/User/CapNhat/`+ id;
  console.log('id được cập nhật là: ', updatedData)
  return this.http.put<any>(url, updatedData).pipe(
    
    catchError((error) => {
      console.error('Cập nhật không thành công:', error);
      throw error;
    })
  );
}

}
