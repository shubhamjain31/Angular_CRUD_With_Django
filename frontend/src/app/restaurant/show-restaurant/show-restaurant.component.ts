import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.component.html',
  styleUrls: ['./show-restaurant.component.css']
})
export class ShowRestaurantComponent implements OnInit {

  public restaurant_list:any = [];
  public all_menus: any = [];
  staticAlertClosed:boolean  = false;
  template_form: boolean     = true;
  loader: boolean            = false;
  public error_msg:   any;
  public closeModal:  any;
  public name:        any;
  public id:          any;
  is_rating: boolean = false;
  submitted: boolean = false;
  rating_number: any;

  displayedColumns: string[] = ['Menu'];
  dataSource = this.all_menus;
  public fileName: string = '';

  states: any = [
    {'name': 'Andhra Pradesh'},
    {'name': 'Arunachal Pradesh'},
    {'name': 'Assam'},
    {'name': 'Bihar'},
    {'name': 'Chhattisgarh'},
    {'name': 'Goa'},
    {'name': 'Gujarat'},
    {'name': 'Haryana'},
    {'name': 'Himachal Pradesh'},
    {'name': 'Jharkhand'},
    {'name': 'Karnataka'},
    {'name': 'Kerala'},
    {'name': 'Madhya Pradesh'},
    {'name': 'Maharashtra'},
    {'name': 'Manipur'},
    {'name': 'Meghalaya'},
    {'name': 'Mizoram'},
    {'name': 'Nagaland'},
    {'name': 'Odisha'},
    {'name': 'Punjab'},
    {'name': 'Rajasthan'},
    {'name': 'Sikkim'},
    {'name': 'Tamil Nadu'},
    {'name': 'Telangana'},
    {'name': 'Tripura'},
    {'name': 'Uttar Pradesh'},
    {'name': 'Uttarakhand'},
    {'name': 'West Bengal'}
  ]

  constructor(private commonservice:CommonService, private modalService: NgbModal, private toastr: ToastrService,
    private http: HttpClient, private _FileSaverService: FileSaverService,  private dialog: MatDialog,
    private router:Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.template_form = false;
    this.loader = true;

    this.commonservice.showRestaurant().subscribe((data:any) => {
      if(data['success']){
        this.restaurant_list = data['all_restaurant'];
        this.template_form = true;
        this.loader = false;
      }

      setTimeout(()=>{   
        $('#restaurant_table').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          searching: false,
          columnDefs: [
          { "orderable": false, "className": 'reorder', "targets": [0,5] },
          { "targets": [], "orderable": false }
          ],
          lengthMenu : [5, 10, 25]
        });
      }, 1);
            
    });
  }

  update_restaurant_list(){
    this.commonservice.showRestaurant().subscribe((data:any) => {
      if(data['success']){
        this.restaurant_list = data['all_restaurant']
      }
    });
  }

  openModal(content:any, name:string, id:number){
    this.name = name;
    this.id   = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  delete(){
    this.commonservice.deleteRestaurant({id:this.id}).subscribe((data:any)=>{
      if(data['success']){
          this.error_msg = data['msg']
          this.showSuccessAlert(this.error_msg)
        }
      if(data['error']){
          this.error_msg = data['msg']
          this.showErrorAlert(this.error_msg)
        }
    })

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

  download_menus(id:number, MessageDialog:any){
    this.commonservice.download_all_menus(id).subscribe((data:any)=>{
      if(data['success']){
        this.all_menus = data['all_menus'];

        this.downloadPDF('csv', MessageDialog);
      }
     })
  }

  downloadPDF(type: string, MessageDialog:any) {
    if(this.all_menus.length === 0){
      this.openDialogWithTemplateRef(MessageDialog);
      return;
    }

    const fileName = `save.${type}`;
    var csvData = this.ConvertToCSV(this.all_menus);
      
      const fileType = this._FileSaverService.genType(fileName);
      const txtBlob = new Blob([csvData], { type: fileType });
      this._FileSaverService.save(txtBlob, fileName);

  }

  ConvertToCSV(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }

   openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  gallery(id:number){
    this.router.navigate(["gallery", id])
  }

  openBottomSheet(content:any, pk: string): void {
    this.rating_number = this.filter_data(this.restaurant_list, pk).review
    this.id = pk;
    this._bottomSheet.open(content);
  }

  rating(event: any, num: number){
    let data = {
      rate: num,
    }

    this.commonservice.rating_restaurant(this.id, data).subscribe((data:any)=>{
      if(data["success"]){
        this.error_msg = data['msg']
        this.showSuccessAlert(this.error_msg)

        this._bottomSheet.dismiss();
        this.update_restaurant_list();
      }
    });
  }

  filter_data(all_data: any, single_data: string){
    for(let i=0; i<all_data.length; i++){
      if(all_data[i]['pk'] === single_data){
        return all_data[i];
      }
    }
  }

  sheetRef: any;
  openAddressDetail(content:any, pk: string, name: string): void {
    this.id = pk;

    this.commonservice.getAddressDetail(this.id).subscribe((data:any) => {
      if(data['success']){

        this.addressDetail = new FormGroup({
        address:            new FormControl(data['all_data']['address']),
        address_optional:   new FormControl(data['all_data']['address_optional'] || ''),
        city:               new FormControl(data['all_data']['city']),
        state:              new FormControl(data['all_data']['state']),
        country:            new FormControl(data['all_data']['state'] || "India"),
        pincode:            new FormControl(data['all_data']['pincode'])
      })
      }

      if (data["error"]){
          this.error_msg = data['msg'];
          this.showErrorAlert(this.error_msg);
        }
    });

    this.router.navigate(['/show'], { fragment: name.replace(/ /g,"+") })   // here whitespace will replaced by plus
    this.sheetRef = this._bottomSheet.open(content, {
       panelClass: 'custom_css_for_address_details'
    });
  }

  closeAddressDetailsSheet(){
    this.router.navigate(['/show']);
    this.sheetRef.dismiss();
  }

  addressDetail = new FormGroup({
    address:            new FormControl('', Validators.required),
    address_optional:   new FormControl(''),
    city:               new FormControl('', Validators.required),
    state:              new FormControl('', Validators.required),
    country:            new FormControl(Validators.required),
    pincode:            new FormControl('', Validators.required)
  })

  check_details(){
    if(this.addressDetail.controls.address.value === null){
      this.error_msg = 'Please Enter Address';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.city.value === null){
      this.error_msg = 'Please Enter Address';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.state.value === null){
      this.error_msg = 'Please Enter Address';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.pincode.value === null){
      this.error_msg = 'Please Enter Address';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.address.value.trim() === ''){
      this.error_msg = 'Please Enter Address';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.city.value.trim() === ''){
      this.error_msg = 'Please Enter City';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.state.value.trim() === ''){
      this.error_msg = 'Please Enter State';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    if(this.addressDetail.controls.pincode.value.trim() === ''){
      this.error_msg = 'Please Enter Pincode';
      this.showErrorAlert(this.error_msg);
      return true;
    }

    return false;
  }

  details(){
    const validate = this.check_details();
    if(validate === true){
      return;
    }

    this.submitted = true;

    if(this.addressDetail.invalid) {
      let msg = 'Invalid Form'
      this.showErrorAlert(msg);
      return;
    }

    this.commonservice.addressDetailForRestaurant(this.id, this.addressDetail.value).subscribe((data:any)=>{
        if (data["success"]){
          this.error_msg = data['msg'];
          this.showSuccessAlert(this.error_msg);
          this.update_restaurant_list();
        }
        if (data["error"]){
          this.error_msg = data['msg'];
          this.showErrorAlert(this.error_msg);
        }
    })
    this.submitted = false;
    this.sheetRef.dismiss();

  }

}
