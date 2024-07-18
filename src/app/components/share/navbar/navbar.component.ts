import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logOut():void{
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  param(param:any){
    //this.route.navigate([`dashboard/${param}`]);
  }

}
