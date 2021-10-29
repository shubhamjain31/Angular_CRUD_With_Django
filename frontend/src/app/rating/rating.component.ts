import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../services/common.service';

export interface PeriodicElement {
  remove_col(fields: any): any;
}

const ELEMENT_DATA: PeriodicElement[] = this.remove_col();

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  public restaurant_list:any = [];

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
    this.commonservice.showRestaurant().subscribe((data:any) => {
      if(data['success']){
        this.restaurant_list = data['all_restaurant'];
        console.log(this.remove_col())
      }
    });
  }

  displayedColumns: any[] = ['fields', 'fields', 'fields'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  remove_col(): any{
    var restaurant_array = JSON.parse(JSON.stringify(this.restaurant_list));
    for(let i in restaurant_array) {
       delete restaurant_array[i].model;
       delete restaurant_array[i].pk;
    }
    return restaurant_array;
  }

}
