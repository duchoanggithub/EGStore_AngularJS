import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  test : Date = new Date();

  constructor(private router: Router ) {}

  ngOnInit() {

  }
  getPath(){
    return this.router.url;
  }
}