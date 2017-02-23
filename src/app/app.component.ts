import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd} from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private hideHeader;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location : Location
  ) {}

  private ngOnInit() {
    this.displayLogic();
  }

  private displayLogic(){
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationEnd) {
          //this is the same as line 37, but with router.event instead
          //  if(!!event.url.startsWith('/login')
          //  || !!event.urlAfterRedirects.startsWith('/login')){
          //    this.hideHeader= true;
          //  }else{
          //    this.hideHeader= false;
          //  }

          this.hideHeader = (!!location.pathname.startsWith('/login'));

          //we could also use login to verify user authentication here, but we  are using guards instead.
       }
    });

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
  public logout(params) {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
