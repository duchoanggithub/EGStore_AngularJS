import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  post(arg0: string, blogSV: BlogService) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  //các phương thức khác 
  getListBlog(): Observable<any> {
    return this.http.get<any>('http://localhost:5144/api/Blog/LayTatCa')
  }

  addBlog(newBlog: any): Observable<any> {
    const url = 'http://localhost:5144/api/Blog/Them';
    return this.http.post<any>(url, newBlog);
  }
  getBlogById(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Blog/TimKiem/${id}`;
    return this.http.get<any>(url);
  }

  deleteBlog(id: string): Observable<any> {
    const url = `http://localhost:5144/api/Blog/Xoa/${id}`;
    return this.http.delete<any>(url);
  }

  
  updateBlog(id: string, updatedData: any): Observable<any> {
    const url = `http://localhost:5144/api/Blog/CapNhat/` + id;
    console.log('id được cập nhật là: ', updatedData)
    return this.http.put<any>(url, updatedData).pipe(
      catchError((error) => {
        console.error('Cập nhật không thành công:', error);
        throw error;
      })
    );
  }
}
