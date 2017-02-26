import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';
import { AuthorService } from '../shared/services/author.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './partials/edit.html'
})
export class BookEditComponent implements OnInit {

  updateBookForm: FormGroup;
  book: Book;
  successMessage: string = '';
  errorMessage: string = '';
  submitted: boolean;
  mapAuthors: Object;

  constructor(private _fb: FormBuilder,
    private authorService: AuthorService,
    private service: BookService,
    private router: ActivatedRoute) { }


  ngOnInit() {
    // grab the user
    let id = this.router.snapshot.params['id'];

    this.updateBookForm = this._fb.group({
         name: [null, [Validators.required,
                          Validators.minLength(5)]],
         description: [null, [Validators.required]],
         publication_date: [null, [Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10)]],
         author_id: [null, [Validators.required]]
       });

    //better way : using forkJoin for several Observables, this is like $q.all in Angular 1
    Observable.forkJoin(
      this.authorService.getMapAuthors(),
      this.service.getBook(id)
    )
    .subscribe(data => {
      this.mapAuthors = data[0];
      this.book = data[1];
      (<FormGroup>this.updateBookForm).patchValue(this.book, { onlySelf: true });
    });

    //ugly way : callback of Observables
    // this.authorService.getMapAuthors().subscribe(mapAuthors => {
    //     this.mapAuthors = mapAuthors;
    //
    //     this.service.getBook(id).subscribe(book => {
    //         this.book = book;
    //         (<FormGroup>this.updateBookForm).patchValue(this.book, { onlySelf: true });
    //     });
    // });
  }

  /**
   * Update Book
   */
  updateBook(form: FormGroup) {
    this.successMessage = '';
    this.errorMessage   = '';
    this.submitted = true;

    let book : Book = form.value;
    book.id = this.book.id;

    if(!!form.valid){
      this.service.updateBook(book)
        .subscribe(
          user => {
            this.successMessage = 'Book was updated.';
            console.log('book was updated');
          },
          err => {
            this.errorMessage = err;
            console.error(err);
          }
        );
    }
  }


}
