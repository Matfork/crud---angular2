import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../shared/services/author.service';
import { Author } from '../shared/models/author';

@Component({
  styles: [`
    .user-card { cursor: pointer; }
  `],
  templateUrl: './partials/list.html'
})
export class AuthorListComponent implements OnInit {
  authors: Author[];

  constructor(private service: AuthorService) { }

  ngOnInit() {
    this.service.getAuthors()
      .subscribe(authors => {        
        this.authors = authors
      });
  }

}
