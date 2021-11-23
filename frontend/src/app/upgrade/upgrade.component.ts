import { Component, OnInit } from '@angular/core';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  handler:any = null;

  API_KEY = GlobalConstantsComponent.STRIPE_PUBLISHABLE_KEY;

  constructor() { }

  ngOnInit(): void {
    this.loadStripe();
  }

   pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: this.API_KEY,
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name:         'FoodMania',
      description: 'Delicious Food',
      amount:       amount * 100
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
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

}
