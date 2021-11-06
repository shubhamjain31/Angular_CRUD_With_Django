import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  public error_msg: any;

  submitted:boolean          = false;
  staticAlertClosed:boolean  = false;

  addRestaurent = new FormGroup({
    name:   new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private commonservice:CommonService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  create(){
    this.submitted = true;

    if(this.addRestaurent.invalid) {
      return;
    }

      this.commonservice.addRestaurant(this.addRestaurent.value).subscribe((data:any)=>{
        if (data["success"]){
          this.error_msg = "Restaurant Saved Successfully!"
          this.showSuccessAlert(this.error_msg)
        }
        if(data['error']){
          this.error_msg = data['msg']
          this.showErrorAlert(this.error_msg)
        }
    })
      this.addRestaurent.reset()
      this.submitted = false;
  }

  showSuccessAlert(msg:string) {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      // positionClass: 'toast-top-center'
    });
  }

  showErrorAlert(msg:string) {
    this.toastr.show('<span class="fa fa-times" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
    });
  }

}
