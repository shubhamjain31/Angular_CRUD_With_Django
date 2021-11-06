import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  public error_msg: any;

  submitted:boolean          = false;
  staticAlertClosed:boolean  = false;

  editRestaurent = new FormGroup({
    name:   new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private commonservice:CommonService, private toastr: ToastrService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.commonservice.getCurrentData(this.router.snapshot.params.id).subscribe((data:any)=>{
      this.editRestaurent = new FormGroup({
        name:     new FormControl(data['all_data']['name']),
        mobile:   new FormControl(data['all_data']['mobile']),
        email:    new FormControl(data['all_data']['email'])
      })
    })
  }

  update(){
    this.submitted = true;

    if(this.editRestaurent.invalid) {
      return;
    }

      this.commonservice.editRestaurant(this.router.snapshot.params.id, this.editRestaurent.value).subscribe((data:any)=>{
        if (data["success"]){
          this.error_msg = data['msg']
          this.showSuccessAlert(this.error_msg)
        }
        if (data["error"]){
          this.error_msg = data['msg']
          this.showErrorAlert(this.error_msg)
        }
    })
      // this.editRestaurent.reset()
      this.submitted = false;
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

}
