import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';
import{ GlobalConstantsComponent } from 'src/app/common/global-constants/global-constants.component';

@Component({
  selector: 'app-gallery-restaurant',
  templateUrl: './gallery-restaurant.component.html',
  styleUrls: ['./gallery-restaurant.component.css']
})
export class GalleryRestaurantComponent implements OnInit {
  staticAlertClosed:boolean  = false;
  is_image:boolean           = true;
  public error_msg:   any;
  all_images: any = [];

  APIUrl = GlobalConstantsComponent.APIUrl + '/media/';

  constructor(private commonservice:CommonService, private route: ActivatedRoute, private toastr: ToastrService) { console.log('gallery modeule loaded')}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.commonservice.get_images(id).subscribe((data:any) => {
      if(data['success']){
        this.all_images = data['all_images'];
      }
    });
  }

  uploadImage(){
    const id:any = this.route.snapshot.paramMap.get('id');

    let image = (<HTMLInputElement>document.getElementById('formFile'));
    const file: File = (image.files as FileList)[0];

    const gallery = new FormData();

    gallery.append('id', id)
    gallery.append('image', file, file.name)
    
    this.commonservice.upload_image(gallery).subscribe((data:any)=>{
      if (data["success"]){
        image.value = '';
        this.is_image = true;

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

  image_file(files: FileList | null){
    if((files as FileList).length>0) {
      this.is_image = false;
    }
    else{
      this.is_image = true;
    }
  }

}
