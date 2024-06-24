import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { languages, notifications, userItems } from './header-dummy-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = true;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;

  constructor( private router: Router) { }

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWitdh: number): void {
    if (innerWitdh < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
  
  home():void{
    this.router.navigate(['page/home']);
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}