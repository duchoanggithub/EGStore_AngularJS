import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  randomBlogs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogSV: BlogService
  ) {}

  ngOnInit(): void {
    this.getBlogDetails();
    this.getRandomBlogs();
  }

  getBlogDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogSV.getBlogById(id).subscribe(
        (data: any) => {
          this.blog = data;
        },
        (error: any) => {
          console.error('Error fetching blog details', error);
        }
      );
    }
  }

  getRandomBlogs(): void {
    this.blogSV.getListBlog().subscribe(
      (data: any[]) => {
        this.randomBlogs = this.shuffleArray(data).slice(0, 3);
      },
      (error: any) => {
        console.error('Error fetching blogs', error);
      }
    );
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
