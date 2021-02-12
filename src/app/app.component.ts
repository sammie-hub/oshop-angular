import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'oshop';

  constructor(private userService: UserService, private auth: AuthService, router: Router,
     private http:HttpClient)
  {
    // auth.user$.subscribe(user => {
    //   if(user){
    //     userService.save(user);
    //     let returnUrl = localStorage.getItem('returnUrl');
    //     router.navigateByUrl(returnUrl);
    //   }
    // })
    // this.http.get("http://localhost:8080/").toPromise().then(r=>console.log(r));

  }
  async ngOnInit() {
    // await this.shoppingCartService.getCart();
  }
}
