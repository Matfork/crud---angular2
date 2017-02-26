import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../shared/models/author';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthorService } from '../shared/services/author.service';

@Component({
  templateUrl: './partials/create.html'
})
export class AuthorCreateComponent implements OnInit {
  public newAuthorForm: FormGroup;
  public submitted: boolean;
  public successMessage: string = '';
  public errorMessage: string = '';

  public formErrors :Object = {
    'firstName': '',
    'lastName': '',
    'age': ''
  };

  public validationMessages :Object  = {
    'firstName': {
      'required':  'First Name is required.',
      'minlength': 'First Name must be at least 5 characters long.',
      'forbiddenValue': 'Someone named "Admin" cannot be an author.'
    },
    'lastName': {
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
            private router: Router) {}


  ngOnInit() {
    this.newAuthorForm = this._fb.group({
         firstName: ['', [Validators.required,
                          Validators.minLength(5),
                          this.forbiddenValueValidator()]],
         lastName: ['', [Validators.required,
                         Validators.minLength(5)]],
         age: ['', [Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(2)]],
    });

    //enable validations everytime users changes inputs form
    //this.subcribeToFormChanges();
  }

  subcribeToFormChanges(data? : any) {

     const myFormStatusChanges$ = this.newAuthorForm.statusChanges;
     const myFormValueChanges$ = this.newAuthorForm.valueChanges;

    //  myFormStatusChanges$.subscribe(x => console.log({ event: 'STATUS_CHANGED', object: x }));
     myFormValueChanges$.subscribe(data => {
        this.formErrors = this.doValidations(this.newAuthorForm, this.formErrors, this.validationMessages);
        //console.log({ event: 'VALUE_CHANGED', object: data });
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


  /* Custom Validator*/
 forbiddenValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const currentValue = control.value;
      return currentValue === 'admin' ? {'forbiddenValue': {name}} : null;
    };
  }

  /**
   * Create a Author
   */
  createAuthor(form: FormGroup) {
    this.formErrors = this.doValidations(this.newAuthorForm, this.formErrors, this.validationMessages,true);

    let author : Author = form.value;
    let isValid = form.valid;

    this.successMessage = '';
    this.errorMessage   = '';
    this.submitted = true;

    if(!!isValid){
      this.service.createAuthor(author)
        .subscribe(author => {
          this.successMessage = 'Author was created!';
          console.log('Author was created');
          // navigate back to the users page
          this.router.navigate(['/author']);
        })
    }
  }
}
