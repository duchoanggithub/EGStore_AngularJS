import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignDivVisiable: boolean = false;
  userName!: string;
  password!: string;
  registerData = { userName: '', password: '', confirmPassword: '', email: '' };
  token: any | null = null;
  decodedToken: any = null;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login() {
    if (!this.userName || !this.password) {
      this.toastr.error('Please fill all the fields', 'Error');
      return;
    }
    this.authService.login(this.userName, this.password).subscribe(
      (res) => {
        this.toastr.success('Login successful', 'Success');
        this.authService.currentUserRole.subscribe(role => {
          if (role === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/page/home']);
          }
        });
      },
      error => {
        this.toastr.error('Invalid username or password', 'Error');
      }
    );
  }

  register() {
    if (!this.registerData.userName || !this.registerData.password || !this.registerData.confirmPassword || !this.registerData.email) {
      this.toastr.error('Please fill all the fields', 'Error');
      return;
    }
    this.authService.register(this.registerData).subscribe(
      () => {
        console.log('tài khoản được đăng ký:', this.registerData)
        this.toastr.success('Registration successful', 'Success');
        this.isSignDivVisiable = false; // Sau khi đăng ký thành công, chuyển về màn hình đăng nhập
      },
      error => {
        this.toastr.error('Registration failed', 'Error');
      }
    );
  }
}