import { Component, OnInit } from '@angular/core';
import { Author } from '../shared/models/author';
import { AuthorService } from '../shared/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  templateUrl: './partials/edit.html'
})
export class AuthorEditComponent implements OnInit {
  author: Author;

  public updateAuthorForm: FormGroup;
  public successMessage: string = '';
  public errorMessage: string = '';

  public formErrors :Object = {
    'first_name': '',
    'last_name': '',
    'age': ''
  };

  public validationMessages :Object  = {
    'first_name': {
      'required':  'First Name is required.',
      'minlength': 'First Name must be at least 5 characters long.',
      'forbiddenValue': 'Someone named "Admin" cannot be an author.'
    },
    'last_name': {
      'required':  'Last Name is required.',
      'minlength': 'Last Name must be at least 5 characters long.'
    },
    'age': {
      'required':  'Age is required.',
      'minlength': 'Age must be at least 2 characters long.',
      'maxlength': 'Age must be at max 2 characters long.'
    },
  };

  constructor(private _fb: FormBuilder,
              private service: AuthorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.updateAuthorForm = this._fb.group({
         first_name: ['', [Validators.required,
                          Validators.minLength(5)]],
         last_name: ['', [Validators.required,
                         Validators.minLength(5)]],
         age: ['', [Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)]],
    });

    // grab the user
    let id = this.route.snapshot.params['id'];
    this.service.getAuthor(id).subscribe(author => {
        this.author = author;

      // Update single value
        // (<FormControl>this.updateAuthorForm.controls['first_name']).setValue('John', { onlySelf: true });

      // Update form model
        (<FormGroup>this.updateAuthorForm).patchValue(this.author, { onlySelf: true });
    });
  }

  //dirty checks if user modifed the field
  doValidations(form:FormGroup, formErrors:Object, validationMessages: Object, runOnDemand : boolean = undefined){
    for (const field in formErrors) {
      // clear previous error message (if any)
      formErrors[field] = '';

      const control = form.get(field);
      let checkDirty = (runOnDemand) ? runOnDemand : control.dirty;

      if (control && checkDirty && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
    return formErrors;
  }

  /**
   * Update the author
   */
  updateAuthor(form: FormGroup) {
    this.formErrors = this.doValidations(this.updateAuthorForm, this.formErrors, this.validationMessages, true);

    let author : Author = form.value;
    author.id = this.author.id;

    let isValid = form.valid;

    this.successMessage = '';
    this.errorMessage   = '';

    if(!!isValid){

      this.service.updateAuthor(author)
        .subscribe(
          author => {
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


}
