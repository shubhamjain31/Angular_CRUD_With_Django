import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-constants',
  templateUrl: './global-constants.component.html',
  styleUrls: ['./global-constants.component.css']
})
export class GlobalConstantsComponent implements OnInit {

  constructor() { }

  public static APIUrl: string = "http://127.0.0.1:8000";

  ngOnInit(): void {
  }

}
