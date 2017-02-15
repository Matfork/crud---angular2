import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './partials/edit.html'
})
export class BookEditComponent implements OnInit {
  book: Book;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: BookService, private route: ActivatedRoute) { }

  ngOnInit() {
    // grab the user
    let id = this.route.snapshot.params['id'];
    this.service.getBook(id).subscribe(book => this.book = book);
  }

  /**
   * Update Book
   */
  updateBook() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.updateBook(this.book)
      .subscribe(
        user => {
          this.successMessage = 'Book was updated.';
          console.log('book was updated');
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }
      );
  }


}
