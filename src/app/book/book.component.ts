import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'book',
  templateUrl: './partials/main.html'
})
export class BookComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: BookService) {}

  ngOnInit() {
    // author has been created
    this.service.bookCreated$.subscribe(book => {
      console.log(book);
      this.successMessage = `${book.name} has been created!`;
      this.clearMessages();
    });

    // author has been deleted
    this.service.bookDeleted$.subscribe(() => {
      this.successMessage = `The author has been deleted!`;
      this.clearMessages();
    });
  }

  /**
   * Clear all messages after 5 seconds
   */
  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage   = '';
    }, 5000);
  }
}
