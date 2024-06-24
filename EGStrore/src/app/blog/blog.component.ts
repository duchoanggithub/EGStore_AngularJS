import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { BlogService } from '../services/blog.service';
import { AddBlogComponent } from './add-blog/add-blog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  blogs: any = [];
  displayedColumns: string[] = ['id', 'title', 'author','blogImg','upDay', 'updateDay', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private blogSV: BlogService, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    // Lấy danh sách bài viết
    this.blogSV.getListBlog().subscribe(res => {
      this.blogs = res;
      this.blogs = new MatTableDataSource(this.blogs)
      this.blogs.paginator = this.paginator;
      this.blogs.sort = this.sort;

    });
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(AddBlogComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Dữ liệu từ dialog:', result);
        this.getAll();
        this.toastr.success('Thêm bài viết thành công', 'Thành công');
      }
    });
  }
  deleteBlog(id: string): void {
    this.blogSV.deleteBlog(id).subscribe(res => {
      this.getAll();
      console.log('Xóa thành công', res);
      this.toastr.success('Xóa bài viết thành công', 'Thành công');
    });
  }
}
