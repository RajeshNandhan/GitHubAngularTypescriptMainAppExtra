import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './list/person-list.component';
import { PersonEditComponent } from './edit/person-edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
  ]
})
export class PersonModule { }
