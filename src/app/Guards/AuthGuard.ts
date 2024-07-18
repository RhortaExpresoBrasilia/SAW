import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._auth.isLoggedIn()) {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwtDecode(token!);
        const usernameFromUrl = route.paramMap.get('username');
        if (decodedToken && decodedToken.sub === usernameFromUrl) {
          return true;
        } else {
          this.router.navigate(['/http401']);
          return false;
        }
      }
    }else{
      const usernameFromUrl = route.paramMap.get('username');
      const passFromUrl = route.paramMap.get('password');

      this._auth.login({ username: usernameFromUrl!, password: passFromUrl! },'auth/login').subscribe((response) => {
        console.log(response);
        
         if (response.error == true) {
           this.router.navigate(['/http401']);
           return false;
         }else{
           const token = response.data;
           localStorage.setItem('token', token);
           return true;
         }
       }, (err) => {
         if (err.status == 401) {
           this.router.navigate(['/http401']);
           return false;
         }
          console.log("Error: " + JSON.stringify(err));
          return false;
       });
    }

    return true;
  }
}