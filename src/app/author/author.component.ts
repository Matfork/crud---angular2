import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../shared/services/author.service';

@Component({
  selector: 'author',
  templateUrl: './partials/author.html'
})
export class AuthorComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: AuthorService) {}

  ngOnInit() {
    // author has been created
    this.service.authorCreated$.subscribe(author => {
      this.successMessage = `${author.first_name} ${author.last_name} has been created!`;
      this.clearMessages();
    });

    // author has been deleted
    this.service.authorDeleted$.subscribe(() => {
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
