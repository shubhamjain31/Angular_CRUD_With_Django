import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-constants',
  templateUrl: './global-constants.component.html',
  styleUrls: ['./global-constants.component.css']
})
export class GlobalConstantsComponent implements OnInit {

  constructor() { }

  public static APIUrl: string = "http://localhost:8000";
  public static STRIPE_PUBLISHABLE_KEY: string = "pk_test_51JttRQSG6SEoW7jenFmw1bOTCu1xchL283BnEPV85MZJ0i2VQ4PFuY5buV7RxbW3KnbhvhU8cK3KBKqiVC1q8Lnu00rNB6sjx1";
  public static GOOGLE_API: string = "591641495893-t5otmtkmn2c5c94l1j2cv6mnivr7e4bv.apps.googleusercontent.com"

  ngOnInit(): void {
  }

}
