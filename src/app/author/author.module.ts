import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { AuthorListComponent } from './author-list.component';
import { AuthorSingleComponent } from './author-single.component';
import { AuthorEditComponent } from './author-edit.component';
import { AuthorCreateComponent } from './author-create.component';

import { AuthorService } from '../shared/services/author.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthorRoutingModule
  ],
  declarations: [
    AuthorComponent,
    AuthorListComponent,
    AuthorSingleComponent,
    AuthorEditComponent,
    AuthorCreateComponent
  ],
  providers: [ AuthorService ]
})

export class AuthorModule {}
