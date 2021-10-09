import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms' 

@Component({
  selector: 'app-menu-add-edit-restaurant',
  templateUrl: './menu-add-edit-restaurant.component.html',
  styleUrls: ['./menu-add-edit-restaurant.component.css']
})
export class MenuAddEditRestaurantComponent implements OnInit {
  
  addMenusForm: FormGroup;  

  constructor(private fb:FormBuilder) { 
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
      name: ''  
    })  
  }  


  addvalue(){
    this.menu_list().push(this.newMenu());  
  }

  removevalue(i:number){
    this.menu_list().removeAt(i);  
  }

  create(){
    console.log('djs',this.addMenusForm.value )
  }

}
