import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-constants',
  templateUrl: './global-constants.component.html',
  styleUrls: ['./global-constants.component.css']
})
export class GlobalConstantsComponent implements OnInit {

  constructor() { }

  public static APIUrl: string = "http://127.0.0.1:8000";
  public static STRIPE_PUBLISHABLE_KEY: string = "pk_test_51JttRQSG6SEoW7jenFmw1bOTCu1xchL283BnEPV85MZJ0i2VQ4PFuY5buV7RxbW3KnbhvhU8cK3KBKqiVC1q8Lnu00rNB6sjx1";

  ngOnInit(): void {
  }

}
