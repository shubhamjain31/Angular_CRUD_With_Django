import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-gallery-restaurant',
  templateUrl: './gallery-restaurant.component.html',
  styleUrls: ['./gallery-restaurant.component.css']
})
export class GalleryRestaurantComponent implements OnInit {
  staticAlertClosed:boolean  = false;
  public error_msg:   any;

  constructor(private commonservice:CommonService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  uploadImage(){
    const id = this.route.snapshot.paramMap.get('id');

    let image = (<HTMLInputElement>document.getElementById('formFile'));
    const file: File = (image.files as FileList)[0];

    let gallery = {
      'image':file.name
    }
    
    this.commonservice.upload_image(id, gallery).subscribe((data:any)=>{
      if (data["success"]){
        image.value = '';
        this.showSuccessAlert(data['msg'])
      }
      });
  }

  showSuccessAlert(msg:string) {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon"
    });
  }

}
