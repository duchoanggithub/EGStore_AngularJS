import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';


const routes: Routes = [
  {
    path: '',
     component: BlogComponent
  },
  {
    path: 'edit/:id',
    component: EditBlogComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
