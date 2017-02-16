import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { MDL } from './MaterialDesignLiteUpgradeElement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // users: User[];

  constructor(
    // private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe(
    //     users => this.users = users
    //   );
  }

  /**
   * Is the user logged in?
   */
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Log the user out
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
