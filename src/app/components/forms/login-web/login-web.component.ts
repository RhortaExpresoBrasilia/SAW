import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-web',
  templateUrl: './login-web.component.html',
  styleUrls: ['./login-web.component.css']
})
export class LoginWebComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _api: AuthService, private routeNavigate: Router) { }
  username!: string;
  password!: string;
  isLoading: boolean = false;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.password = params['password'];
    });

    this.isLoading = true;
    
    this._api.login({ username: this.username, password: this.password },'aut/login').subscribe((response) => {
      const token = response.data;
      localStorage.setItem('token', token);

      //this.routeNavigate.navigate(['/dashboard']);
    }, (err) => {
      this.isLoading = true;
      
    }, () => {
      this.isLoading = true;
    });

  }

}
