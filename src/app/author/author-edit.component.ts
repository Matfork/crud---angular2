import { Component, OnInit } from '@angular/core';
import { Author } from '../shared/models/author';
import { AuthorService } from '../shared/services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './partials/edit.html'
})
export class AuthorEditComponent implements OnInit {
  author: Author;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: AuthorService, private route: ActivatedRoute) { }

  ngOnInit() {
    // grab the user
    let id = this.route.snapshot.params['id'];
    this.service.getAuthor(id).subscribe(author => this.author = author);
  }

  /**
   * Update the author
   */
  updateAuthor() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.updateAuthor(this.author)
      .subscribe(
        user => {
          this.successMessage = 'Author was updated.';
          console.log('author was updated');
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }
      );
  }


}
