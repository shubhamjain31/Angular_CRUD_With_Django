import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-add-edit-restaurant',
  templateUrl: './menu-add-edit-restaurant.component.html',
  styleUrls: ['./menu-add-edit-restaurant.component.css']
})
export class MenuAddEditRestaurantComponent implements OnInit {
  menu_data: any;
  all_menu: any = [];
  menu_id: number = 0;
  
  addMenusForm: FormGroup;  

  constructor(private fb:FormBuilder, private commonservice:CommonService, private route: ActivatedRoute, private toastr: ToastrService) { 
    this.addMenusForm = this.fb.group({  
      addMenuList: this.fb.array([]) ,  
    });  
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.commonservice.getMenu(id).subscribe((data:any)=>{
      if (data["success"]){
        this.all_menu = data['menus'].menu_data.menus;
        this.menu_id  = data['menus'].id;

        if(this.all_menu.length > 0){
          for(let i=0; i<this.all_menu.length; i++){
            this.menu_list().push(this.dataMenu(this.all_menu[i]['name']));  
          }
        }

      }
    })
  }


  menu_list() : FormArray {  
    return this.addMenusForm.get("addMenuList") as FormArray  
  }  

  newMenu(): FormGroup {  
    return this.fb.group({  
      name: ['', [Validators.required]]  
    })  
  } 

  dataMenu(value:any): FormGroup {  
    return this.fb.group({  
      name: [value, [Validators.required]]  
    })  
  }  


  addvalue(){
    this.menu_list().push(this.newMenu());  
  }

  removevalue(i:number){
    this.menu_list().removeAt(i);  

    this.delete();
  }

  create(){
    if(this.addMenusForm.invalid){
      return;
    }
    else if(this.menu_id){
      this.menu_data = {
        "id": this.menu_id,
        "menus": this.addMenusForm.value['addMenuList']
      }

      this.commonservice.updateMenu(this.menu_data).subscribe((data:any)=>{
        if (data["success"]){
          this.showSuccessAlert(data['msg'])
        }
    })
    }
    else{
      const id = this.route.snapshot.paramMap.get('id');
      this.menu_data = {
        "id": id,
        "menus": this.addMenusForm.value['addMenuList']
      }

      this.commonservice.addMenu(this.menu_data).subscribe((data:any)=>{
        if (data["success"]){
          this.showSuccessAlert(data['msg'])
        }
    })
    }
  }

  clear() {
    let menu_length = this.addMenusForm.value['addMenuList'];
    for(let i=menu_length.length-1; i>=0; i--){
      this.menu_list().removeAt(i);  
    }
  }

  showSuccessAlert(msg:string) {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      // positionClass: 'toast-top-center'
    });
  }

  delete(){
    console.log(this.addMenusForm.value['addMenuList'])
  }
}