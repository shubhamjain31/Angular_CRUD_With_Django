import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  is_logged_in: boolean;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.is_logged_in = this.route.snapshot.data['is_logged_in'];
  }

}
