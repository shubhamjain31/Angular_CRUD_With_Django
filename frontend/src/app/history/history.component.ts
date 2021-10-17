import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  all_entries: any = [];

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
    this.commonservice.allHistory().subscribe((data:any) => {
      if(data['success']){
        this.all_entries = data['all_entries'];
      }
    });
  }

}
