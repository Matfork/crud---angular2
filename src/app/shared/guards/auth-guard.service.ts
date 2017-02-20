import { Injectable }     from '@angular/core';
import { Router, CanActivate,CanActivateChild }    from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService : AuthService ) {}

  canActivate() :any{

    // logged in so return true
    if(this.authService.isLoggedIn()) {

      return this.authService.verifyToken('guard')
        .map(res => {
            let dataJson = res.json();

            // creds are still valid
            if(dataJson.code === 200){
              console.log('still valid', dataJson);
              return true;
            }
            return false;
        })
        .catch(function(err)
        {
            let data = err.json() || '';
            // creds have expired
            if(data.code === 401){
              console.log('creds expired', data);
            }else{
              console.log('general error', data);
            }

            this.router.navigate(['/login'], { queryParams: { msg: 'Token Expired' } });
            return false;
        });

    }else{
      // not logged in so redirect to login page
      console.log('not logged, redirecto to login page');
      this.router.navigate(['/login'], { queryParams: { msg: 'User not logged' } });
      return false;
    }

  }

  canActivateChild(): boolean{
    return this.canActivate();
  }
}
