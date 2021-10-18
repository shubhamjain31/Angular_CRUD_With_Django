import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.component.html',
  styleUrls: ['./show-restaurant.component.css']
})
export class ShowRestaurantComponent implements OnInit {

  public restaurant_list:any = [];
  public all_menus: any = [];
  staticAlertClosed:boolean  = false;
  public error_msg:   any;
  public closeModal:  any;
  public name:        any;
  public id:          any;

  displayedColumns: string[] = ['Menu'];
  dataSource = this.all_menus;
  public fileName: string = '';

  constructor(private commonservice:CommonService, private modalService: NgbModal, private toastr: ToastrService,
    private http: HttpClient, private _FileSaverService: FileSaverService,  private dialog: MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    this.commonservice.showRestaurant().subscribe((data:any) => {
      if(data['success']){
        this.restaurant_list = data['all_restaurant']
      }

      setTimeout(()=>{   
        $('#restaurant_table').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          searching: false,
          columnDefs: [
          { "orderable": false, "className": 'reorder', "targets": [0,4] },
          { "targets": [], "orderable": false }
          ],
          lengthMenu : [5, 10, 25]
        });
      }, 1);
            
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
}
