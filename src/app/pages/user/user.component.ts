import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit{
    Form:FormGroup

    constructor(private fb:FormBuilder){

    }
    
    ngOnInit(){
        this.Form = this.fb.group({
            name:[''],
            username:[''],
            email:['']
        })
    }

   save(){
       console.log(this.Form.value);
   }
}
