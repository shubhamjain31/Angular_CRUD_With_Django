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
  all_images: any = [];

  constructor(private commonservice:CommonService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // this.commonservice.get_images(id).subscribe((data:any) => {
    //   if(data['success']){
    //     this.all_images = data['all_images'];
    //   }
    // });
  }

  uploadImage(){
    const id = this.route.snapshot.paramMap.get('id');

    let image = (<HTMLInputElement>document.getElementById('formFile'));
    const file: File = (image.files as FileList)[0];

    const gallery = new FormData();

    gallery.append('image', file.name)


    console.log(gallery.get('image'),'sdhhss')
    let gall = {
      'image' :     file
    }
    
    this.commonservice.upload_image(id, gall).subscribe((data:any)=>{
      if (data["success"]){
        image.value = '';

        this.all_images = data['all_images'];
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
