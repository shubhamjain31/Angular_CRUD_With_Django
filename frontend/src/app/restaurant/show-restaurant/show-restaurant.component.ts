import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-restaurant',
  templateUrl: './show-restaurant.component.html',
  styleUrls: ['./show-restaurant.component.css']
})
export class ShowRestaurantComponent implements OnInit {

  public restaurant_list:any = [];
  staticAlertClosed:boolean  = false;
  public error_msg:   any;
  public closeModal:  any;
  public name:        any;
  public id:          any;

  constructor(private commonservice:CommonService, private modalService: NgbModal, private toastr: ToastrService,
    private http: HttpClient) { }

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

}
