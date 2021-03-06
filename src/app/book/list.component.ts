import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';
import * as moment from "moment";

@Component({
  styles: [`
    .user-card { cursor: pointer; }
  `],
  templateUrl: './partials/list.html'
})
export class BookListComponent implements OnInit {
  books: Book[];
  mj = moment;

  constructor(private service: BookService) {}

  ngOnInit() {
    this.service.getBooks()
      .subscribe(books => {
        this.books = books
      });
  }

}
