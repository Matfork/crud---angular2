import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../shared/models/author';
import { AuthorService } from '../shared/services/author.service';

@Component({
  templateUrl: './partials/create.html'
})
export class AuthorCreateComponent implements OnInit {
  author: Author = { first_name: '', last_name: '', age: 0 };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: AuthorService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Create a Author
   */
  createAuthor() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.createAuthor(this.author)
      .subscribe(author => {
        this.successMessage = 'Author was created!';
        console.log('Author was created');
        // navigate back to the users page
        this.router.navigate(['/author']);
      })
  }
}
