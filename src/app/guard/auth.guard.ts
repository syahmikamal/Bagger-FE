import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  jwt: any;
  token: any;
  userId: any;
  TokenPayload:any;


  constructor(
    private router: Router,
    private cookieService: CookieService,
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.token = this.cookieService.get('token');
      this.userId = this.cookieService.get('user_id');

      if (this.token !== '' && this.userId !== '') {

        //Check expired date
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.token);
        const expirationDate = helper.getTokenExpirationDate(this.token);
        const isExpired = helper.isTokenExpired(this.token);

        if (isExpired === true) {

          this.cookieService.delete('user_id', '/');
          this.cookieService.delete('token', '/');

          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Sorry',
            text: 'This token is expired.',
            timer: 3000,
            showConfirmButton: false

          });

          window.location.replace('/login')
        } else if (isExpired === false) {

          this.TokenPayload = decode(this.token);

          const token:any = decode(this.token);

          if (this.TokenPayload.data.email === this.userId) {
            console.info('this is true')
            return true;
          } else {

            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Kicked Out',
              text: 'Credentials not valid',
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false
            });

            // auto logged out, clear cookies and redirect to login page
            this.cookieService.delete('user_id', '/');
            this.cookieService.delete('token', '/');

            window.location.replace('/login');

          }

        }
      } else {

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Attention',
          text: 'Please login first',
          showConfirmButton: false,
          timer: 3000,
          allowOutsideClick: false
        });

        this.cookieService.delete('user_id', '/');
        this.cookieService.delete('token', '/');

        window.location.replace('/login')
      }

    return true;
  }
  
}
