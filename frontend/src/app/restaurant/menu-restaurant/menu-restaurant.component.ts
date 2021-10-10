import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from './restaurant';
import { DataTablesResponse } from 'src/app/datatables-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-restaurant',
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css']
})
export class MenuRestaurantComponent implements OnInit {
  public restaurant_list:any = [];
  staticAlertClosed:boolean  = false;
  public error_msg:   any;

  // dtOptions:    DataTables.Settings = {};
  dtOptions: any = {};
  restaurants:  Restaurant[] = [];

  constructor(private commonservice:CommonService, private toastr: ToastrService, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    var that = this;

    this.dtOptions = {
        dom: 'Blfrtip',
        // buttons: [
        //   {
        //     "text": 'Download',
        //     "titleAttr": 'download',
        //     "action":''
        //   }
        // ],
        buttons:[],
        // pagingType: 'full_numbers',
        serverSide: true,
        processing: true,
        searching: false,
        paging: true,
        order: [],
        columnDefs: [
          { "orderable": false, "className": 'reorder', "targets": [0, 2] },
          { "targets": [], "orderable": false }
        ],
    
        ajax: (dataTablesParameters: any, callback:any) => {
            this.commonservice.allRestaurant( dataTablesParameters, {}).subscribe((resp:any) => {
                    this.restaurants = resp.data;
                    
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: [],
                    });
                });
        },
        columns: [
            { data: "" },
            { data: "name" },
            { data: "add_menu" },
        ],
    };
  }

  showSuccessAlert(msg:string) {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
    });
  }

  showErrorAlert(msg:string) {
    this.toastr.show('<span class="fa fa-times" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
    });
  }

  add_menu(id:any){
    this.router.navigate(["add-menu", id])
  }

}
