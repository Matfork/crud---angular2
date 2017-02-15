import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../shared/models/author';
import { AuthorService } from '../shared/services/author.service';

@Component({
  templateUrl: './partials/single.html'  
})
export class AuthorSingleComponent implements OnInit {
  author: Author;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthorService
  ) {}

  ngOnInit() {
    // grab the id from the url
    let id = this.route.snapshot.params['id'];

    // use the userservice to getUser()
    this.service.getAuthor(id)
      .subscribe(author => this.author = author);
  }

  /**
   * Delete a user
   */
  deleteAuthor() {
    this.service.deleteAuthor(this.author.id)
      .subscribe(data => {
        console.log('user was deleted');
        // route back to the users page
        this.router.navigate(['/users']);
      });
  }

}
