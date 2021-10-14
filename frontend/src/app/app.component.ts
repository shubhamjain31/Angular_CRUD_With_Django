import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  loggedin: any;

  constructor(private authenticationService:AuthenticationService, private router: Router) { }


  ngOnInit(): void {
    this.authenticationService.is_logged_in().subscribe((data: any)=>{
      this.loggedin =  data["is_logged_in"];
      
    });
    
  }

   user_logout() {
    this.loggedin = false;
  }

}
