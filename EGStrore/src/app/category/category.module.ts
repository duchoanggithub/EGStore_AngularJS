import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        MatTableModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSortModule,
        MatDatepickerModule,
        FormsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        CategoryRoutingModule
    ]
})
export class CategoryModule { }
