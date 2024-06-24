import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(private userSV: UserService) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.userSV.getUserByUserName(userName).subscribe(
        (data: any) => {
          this.user = data;
        },
        (error: any) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }
}    

