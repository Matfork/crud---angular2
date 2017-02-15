import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';

@Component({
  templateUrl: './partials/single.html'
})
export class BookSingleComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookService
  ) {}

  ngOnInit() {
    // grab the id from the url
    let id = this.route.snapshot.params['id'];

    // use the userservice to getUser()
    this.service.getBook(id)
      .subscribe(book => {
        this.book = book});
  }

  /**
   * Delete a user
   */
  deleteAuthor() {
    this.service.deleteBook(this.book.id)
      .subscribe(data => {
        console.log('user was deleted');
        // route back to the users page
        this.router.navigate(['/book']);
      });
  }

}
