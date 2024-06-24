import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {}

  ngOnInit(): void { }
  
  onToggleSideNav(data: SideNavToggle): void{
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

}
