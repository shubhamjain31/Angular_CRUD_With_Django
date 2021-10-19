import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-restaurant',
  templateUrl: './gallery-restaurant.component.html',
  styleUrls: ['./gallery-restaurant.component.css']
})
export class GalleryRestaurantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(){
    let image = (<HTMLInputElement>document.getElementById('formFile'));
    const file: File = (image.files as FileList)[0];
    console.log(file.name)
  }

}
