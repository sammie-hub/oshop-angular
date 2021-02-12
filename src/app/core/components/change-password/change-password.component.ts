import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'app/shared/services/login.service';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  nPassword = {};
  result;
  
  constructor(private loginService: LoginService,
    private route: Router) { }

  ngOnInit(): void {
  }

  changePassword(password, f:NgForm){
    this.loginService.changePassword(password).pipe(mergeMap(() => this.loginService.logout()))
    .subscribe(() => {
      this.route.navigate(['/login', {msgType: 'success', msgBody: 'Success! Please sign in with your new password.'}]);
    }, error => {
      // this.submitted = false;
      // this.notification = {msgType: 'error', msgBody: 'Invalid old password.'};
     this.result = "Authentication Failed!. Incorrect Old Password"
    });;
  }
}
