import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-LoginModal',
  templateUrl: './LoginModal.component.html',
  styleUrls: ['./LoginModal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginModalComponent>, private _authService: AuthService) { }

  ngOnInit() {
  }

  onCloseLoginSuccess(success: boolean): void {
    if (success) {
      this.dialogRef.close();
    }
  }

}
