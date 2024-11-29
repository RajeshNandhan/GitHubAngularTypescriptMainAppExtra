import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './list/book-list.component';
import { BookEditComponent } from './edit/book-edit.component';
import { FormsModule } from '@angular/forms';
import { SearchModule } from "../shared/components/search/search.module";


@NgModule({
  declarations: [
    BookListComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    SearchModule
]
})
export class BookModule { }
