// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    // Bỏ qua xác thực cho các yêu cầu lấy danh sách sản phẩm
    if (req.url.includes('/api/Product/LayTatCa') ||
        req.url.includes('/api/Product/LayTheoCategoryId') ||
        req.url.includes('/api/Product/LayTheoSupId')) {
      return next.handle(req);
    }

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
