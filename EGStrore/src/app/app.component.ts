import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EGStore';
  role: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserRole.subscribe(role => {
      this.role = role;
      console.log('User role:', this.role);
    });
    if (this.authService.isAuthenticated()) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  }
}
