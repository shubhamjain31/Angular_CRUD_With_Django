import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  all_entries: any = [];

  displayedColumns = ['position', 'name', 'email', 'table', 'operation', 'datetime', 'change_message'];
  dataSource : any ;
  
  start: number   = 0;
  limit: number   = 15;
  end: number     = this.limit + this.start;
  
  selectedRowIndex: number = 0;

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
    this.commonservice.allHistory().subscribe((data:any) => {
      if(data['success']){
        this.all_entries = data['all_entries'];
      }

    this.dataSource = this.getTableData(this.start, this.end);
    this.updateIndex();
    });

  }

  onTableScroll(e: any) {
    const tableViewHeight       = e.target.offsetHeight // viewport
    const tableScrollHeight     = e.target.scrollHeight // length of all table
    const scrollLocation        = e.target.scrollTop; // how far user scrolled
    
    // If the user has scrolled within 200px of the bottom, add more data
    const buffer  = 200;
    const limit   = tableScrollHeight - tableViewHeight - buffer;    
    
    if (scrollLocation > limit) {
      let data          = this.getTableData(this.start, this.end);;
      this.dataSource   = this.dataSource.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start: any, end: any) {

    let log_arr = this.all_entries;
    
    for(let i=0; i<log_arr.length; i++){
      if(log_arr[i].action_flag === 1){
        log_arr[i]['operation'] = 'ADDITION';
      }
      else if(log_arr[i].action_flag === 2){
        log_arr[i]['operation'] = 'CHANGE';
      }
      else if(log_arr[i].action_flag === 3){
        log_arr[i]['operation'] = 'DELETION';
      }
      
    }
    return log_arr.filter((value: any, index: any) => index >= start && index < end)
  }

  updateIndex() {
    this.start  = this.end;
    this.end    = this.limit + this.start;
  }

  selectedRow(row: any) {
    console.log('selectedRow', row)
  }

}