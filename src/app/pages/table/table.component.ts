import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms'
declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit{
 ColumnDefs: any;  
 RowData: any;  
 IsColumnsToFit: boolean;  
 gridApi: any;  
 Form: FormGroup;
 gridColumnApi: any; 
 data=[] 
 dropdownList=[]
 dropdownSettings:IDropdownSettings= {};
 selectedItems=[]
    constructor(private route:Router,private formBuilder: FormBuilder) { 

    }  
    
    ngOnInit() { 
        this.Form = this.formBuilder.group({
            event_goal_id:[''],
            store_id:[''],
            event_metrics:[''],
            event_model_id:['']
        })
        this.dropdownList = [
            { item_id: 1, item_text: 'Rahul',value:3000 },
            { item_id: 2, item_text: 'Rajan' ,value:8000},
            { item_id: 3, item_text: 'Javed' ,value:90000},
            { item_id: 4, item_text: 'Saurav' ,value:70000},
            { item_id: 5, item_text: 'Raj' ,value:3000 },
            { item_id: 7, item_text: 'Javed' ,value:90000},
            { item_id: 9, item_text: 'Saurav' ,value:71000},
            { item_id: 10, item_text: 'Raj' ,value:3000 }
          ];
          this.data=this.dropdownList
          console.log(this.data.length);
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };
      
    }  

    formatLabel(event) {
        this.data=this.dropdownList.filter(res=>JSON.parse(res.value) < event.value)
     if(this.data.length===0){
         this.data=this.dropdownList
     }
     return this.data;
    }

    save(){
        console.log(this.Form.value);
        
      this.route.navigate(['/create'])

    }
}
