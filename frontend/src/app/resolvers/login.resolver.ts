import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LoginResolver implements Resolve<any>{
    constructor(private authenticationService:AuthenticationService){}

    resolve(){
        return this.authenticationService.is_logged_in()
    }
}