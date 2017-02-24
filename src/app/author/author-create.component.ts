import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../shared/models/author';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../shared/services/author.service';

@Component({
  templateUrl: './partials/create.html'
})
export class AuthorCreateComponent implements OnInit {
  public newAuthorForm: FormGroup;
  public submitted: boolean;

  // author: Author = { first_name: '', last_name: '', age: 0 };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private _fb: FormBuilder,
    private service: AuthorService,
    private router: Router) {}

  ngOnInit() {

    this.newAuthorForm = this._fb.group({
         firstName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
         lastName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
         age: ['', [<any>Validators.required, <any>Validators.minLength(2), <any>Validators.maxLength(2)]],
    });


    this.subcribeToFormChanges();

    // Update single value
      (<FormControl>this.newAuthorForm.controls['firstName']).setValue('John', { onlySelf: true });

    // Update form model
      const author = {
      	firstName: 'Jane',
      	lastName: 'Doe',
        age: 25,
      };
      (<FormGroup>this.newAuthorForm).setValue(author, { onlySelf: true });
  }

  subcribeToFormChanges() {
       const myFormStatusChanges$ = this.newAuthorForm.statusChanges;
       const myFormValueChanges$ = this.newAuthorForm.valueChanges;

       myFormStatusChanges$.subscribe(x =>    console.log({ event: 'STATUS_CHANGED', object: x }));
       myFormValueChanges$.subscribe(x => console.log({ event: 'VALUE_CHANGED', object: x }));
   }

  /**
   * Create a Author
   */
  createAuthor(author: Author, isValid: boolean) {

    this.successMessage = '';
    this.errorMessage   = '';

    this.submitted = true;
    console.log(author)

    // this.service.createAuthor(author)
    //   .subscribe(author => {
    //     this.successMessage = 'Author was created!';
    //     console.log('Author was created');
    //     // navigate back to the users page
    //     this.router.navigate(['/author']);
    //   })
  }
}
