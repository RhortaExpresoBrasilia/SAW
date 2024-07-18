import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Output() loginSuccess = new EventEmitter<boolean>();

  formData: LoginModel = {
    username: '',
    password: ''
  };

  constructor(private _authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const { username, password } = this.formData;
    this._authService.loginOperaciones({ username, password },'auth/login').subscribe((response) => {
     console.log(response);
     
      if (response.error == false) {
       const token = response.data;  
       localStorage.setItem('token', token);

       this._authService.setLoggedIn(true);
       this.loginSuccess.emit(true);
      }else{
        localStorage.removeItem('token')
      }
    }, (err) => {
      localStorage.removeItem('token')
    })

  }
}
