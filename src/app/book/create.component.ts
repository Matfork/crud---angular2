import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';

@Component({
  templateUrl: './partials/create.html'
})

export class BookCreateComponent implements OnInit {
  book: Book = new Book();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: BookService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Create a Author
   */
  createBook() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.createBook(this.book)
      .subscribe(book => {
        this.successMessage = 'Book was created!';
        console.log('Book was created');
        // navigate back to the users page
        this.router.navigate(['/book']);
      })
  }
}
