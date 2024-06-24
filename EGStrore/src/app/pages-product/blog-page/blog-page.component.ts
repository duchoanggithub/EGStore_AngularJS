import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent implements OnInit {
  blogs!: any[];
  p: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private blogSV: BlogService) { }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(): void {
    this.blogSV.getListBlog().subscribe(
      (data: any) => {
        this.blogs = data;
      },
    );
  }
}
