  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {}

  /**
   * Login a user
   */
  login() {
    this.errorMessage = '';

    this.service.login(this.credentials.username, this.credentials.password)
      .subscribe(
        data => {
          if(data.code === 200){
            this.router.navigate(['/author']);
          }
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }
      );
  }

}
