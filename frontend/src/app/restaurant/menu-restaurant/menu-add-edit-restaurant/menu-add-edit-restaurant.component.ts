import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-add-edit-restaurant',
  templateUrl: './menu-add-edit-restaurant.component.html',
  styleUrls: ['./menu-add-edit-restaurant.component.css']
})
export class MenuAddEditRestaurantComponent implements OnInit {
  menu_data: any;
  
  addMenusForm: FormGroup;  

  constructor(private fb:FormBuilder, private commonservice:CommonService, private route: ActivatedRoute) { 
    this.addMenusForm = this.fb.group({  
      addMenuList: this.fb.array([]) ,  
    });  
  }

  ngOnInit(): void {
  }


  menu_list() : FormArray {  
    return this.addMenusForm.get("addMenuList") as FormArray  
  }  

  newMenu(): FormGroup {  
    return this.fb.group({  
      name: ['', [Validators.required]]  
    })  
  }  


  addvalue(){
    this.menu_list().push(this.newMenu());  
  }

  removevalue(i:number){
    this.menu_list().removeAt(i);  
  }

  create(){
    if(this.addMenusForm.invalid){
      return;
    }
    else{
      const id = this.route.snapshot.paramMap.get('id');
      this.menu_data = {
        "id": id,
        "menus": this.addMenusForm.value['addMenuList']
      }

      this.commonservice.addMenu(this.menu_data).subscribe((data:any)=>{
        if (data["success"]){
        }
    })
    }
  }

  clear() {
    let menu_length = this.addMenusForm.value['addMenuList'];
    console.log(menu_length.length)
    for(let i=menu_length.length-1; i>=0; i--){
      this.menu_list().removeAt(i);  
    }
  }

}
