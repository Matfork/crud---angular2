import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookListComponent } from './list.component';
import { BookSingleComponent } from './single.component';
import { BookEditComponent } from './edit.component';
import { BookCreateComponent } from './create.component';

import { BookService } from '../shared/services/book.service';
import { AuthorService } from '../shared/services/author.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BookRoutingModule
  ],
  declarations: [
    BookComponent,
    BookListComponent,
    BookSingleComponent,
    BookEditComponent,
    BookCreateComponent
  ],
  providers: [ BookService, AuthorService ]
})

export class BookModule {}
