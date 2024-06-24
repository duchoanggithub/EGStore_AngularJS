import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn!: boolean;

  imagesbanners = [
    './assets/slider-img/item_home_slider_1.jpg',
    './assets/slider-img/item_home_slider_2.jpg',
    './assets/slider-img/home_slider_3.jpg'
  ];

  constructor(private authSV: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSV.isLoggedIn.subscribe(status => this.isLoggedIn = status);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authSV.logout();
    this.router.navigate(['page/home']);
  }

}
