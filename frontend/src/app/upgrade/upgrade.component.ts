import { Component, OnInit } from '@angular/core';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';
import { AuthenticationService } from '../services/authentication.service';
import { Charge} from './transaction';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  handler:any = null;
  token_data: any;

  API_KEY = GlobalConstantsComponent.STRIPE_PUBLISHABLE_KEY;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.loadStripe();
  }

   pay(amount: any) {
   let total = (amount * 100); 
 
    var handler = (<any>window).StripeCheckout.configure({
      key: this.API_KEY,
      locale: 'auto',
      token: (token: any) => {
         const transaction = new Charge(total, token.id, token);
        this.authenticationService.upgrade(transaction).subscribe((data: any)=>{})
      }
    });
 
    handler.open({
      name:         'FoodMania',
      description: 'Delicious Food',
      amount:       total
    });
 
  }
 

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id      = "stripe-script";
      s.type    = "text/javascript";
      s.src     = "https://checkout.stripe.com/checkout.js";

      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: this.API_KEY,
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

}
