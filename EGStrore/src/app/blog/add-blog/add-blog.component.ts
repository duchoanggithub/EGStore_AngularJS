import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent  {

  addblogForm: FormGroup;
  addBlog: any;

  constructor(
    private dialogRef: MatDialogRef<AddBlogComponent>,
    private fb: FormBuilder, 
    private blogSV: BlogService
  ) {
    this.addblogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
      blogImg: ['', Validators.required],
      upDay: [ this.getCurrentDateTime(), Validators.required],
      updateDay: [this.getCurrentDateTime(), Validators.required],
      isActive: [true]
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addblogForm.valid) {
      const newBlog = this.addblogForm.value;
      this.blogSV.addBlog(newBlog).subscribe(res => {
        console.log("them thanh cong", res);
        console.log("du lieu gui di", newBlog)
        this.dialogRef.close(true);
      })
      
    }
  }
}

