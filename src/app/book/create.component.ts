import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';
import { AuthorService } from '../shared/services/author.service';

@Component({
  templateUrl: './partials/create.html'
})

export class BookCreateComponent implements OnInit {

  newBookForm: FormGroup;
  book: Book = new Book();
  successMessage: string = '';
  errorMessage: string = '';
  submitted: boolean;
  mapAuthors: Object;

  constructor(private _fb: FormBuilder, private authorService: AuthorService, private service: BookService, private router: Router) { }

  ngOnInit() {
    this.authorService.getMapAuthors().subscribe(mapAuthors => {
        this.mapAuthors = mapAuthors;
    });

    this.newBookForm = this._fb.group({
         name: [null, [Validators.required,
                          Validators.minLength(5)]],
         description: [null, [Validators.required]],
         publication_date: [null, [Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10)]],
         author_id: [null, [Validators.required]]
    });
  }

  /**
   * Create a new Book
   */
  createBook(form: FormGroup) {
    this.successMessage = '';
    this.errorMessage   = '';
    this.submitted = true;
    let book : Book = form.value;
    
    if(!!form.valid){
      this.service.createBook(book)
        .subscribe(book => {
          this.successMessage = 'Book was created!';
          console.log('Book was created');
          // navigate back to the users page
          this.router.navigate(['/book']);
        });
    }
  }
}
