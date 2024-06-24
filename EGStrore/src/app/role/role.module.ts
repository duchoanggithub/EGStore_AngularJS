import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatRadioButton } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RoleComponent } from './role.component';
import { RoleRoutingModule } from './role-routing.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatTableModule,
    MatRadioButton,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
