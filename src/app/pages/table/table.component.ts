import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms'
import { ShareService } from '../share.service';
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
 data:any=[] 
 LocalData;
 dropdownListData=[]
 dropdownList1=[]
 dropdownList=[]
 dropdownSettings:IDropdownSettings= {};
 dropdownSettings1:IDropdownSettings= {};

 selectedItems=[]
    constructor(private route:Router,private formBuilder: FormBuilder ,private shareService:ShareService) { 

    }  


    
    ngOnInit() { 

        this.shareService.getEventModel().subscribe(res=>{
            this.dropdownListData=res['results']
            this.data=this.dropdownListData
            console.log(this.data);
        })

        this.LocalData= JSON.parse(localStorage.getItem('event_data1'))
        this.Form = this.formBuilder.group({
            event_goal_id:[''],
            store_id:[''],
            event_metrics:[''],
            event_model_id:['']
        })
        if(this.LocalData){
            console.log(this.LocalData);
        this.Form.patchValue({
            event_goal_id:this.LocalData.event_goal_id,
            store_id:this.LocalData.store_id,
            event_metrics:this.LocalData.event_metrics
        })
              
          }
        this.dropdownList= [
            { store_id: 1, item_text: 'Yaduvanshi store',value:3000, event_matrix: 'download' },
            { store_id: 2, item_text: 'Rahul store' ,value:8000 , event_matrix: 'download'},
            { store_id: 3, item_text: 'Javed store ' ,value:90000 ,event_matrix: 'retention'},
            { store_id: 4, item_text: 'Saurav store' ,value:70000 ,event_matrix: 'retention'},
            { store_id: 7, item_text: 'Javed store' ,value:90000 ,  event_matrix: 'order'},
            { store_id: 9, item_text: 'Saurav store' ,value:71000 , event_matrix: 'order'},
            { store_id: 10, item_text: 'Raj store' ,value:3000  , event_matrix: 'order'}
          ]; 
          //this.data=this.dropdownList
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'store_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };

          this.dropdownList1 = [
            { id: 1, event_matrix: 'download'},
            { id: 2, event_matrix: 'retention'},
            { id: 3, event_matrix: 'order'},
          ];
          this.dropdownSettings1 = {
            singleSelection: false,
            idField: 'id',
            textField: 'event_matrix',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };
      
    }  

    formatLabel(event) {
        console.log(event);
        this.data=this.dropdownListData.filter(res=>JSON.parse(res.est_budget) < event.value)
     if(this.data.length===0){
         this.data=this.dropdownListData
     }
     return this.data;
    }

    save(id){
        console.log(id);
        this.Form.value.event_model_id=id
        console.log(this.Form.value);
        localStorage.setItem('event_data1',JSON.stringify(this.Form.value))
        this.route.navigate(['/create'])

    }

    changes(eventData){
        console.log(eventData);
        let newData=[]
        if(eventData.length===0){
          this.data=this.dropdownListData
        }
        for(let i=0;i<eventData.length;i++){
            for(let j=0;j<this.dropdownListData.length;j++){
                for(let k=0;k<this.dropdownListData[i].event_metrics.length;k++){
                    console.log(this.dropdownListData[i]);
                    
                    if(eventData[i].event_matrix===this.dropdownListData[i].event_metrics[k].title){
                        newData.push(this.dropdownListData[i])
                        console.log(this.dropdownListData[i] );
                    }
                }
            }

        }
        console.log(newData,'new');
        
        if(newData.length===0){
          this.data=this.dropdownListData
        }
        else{
            this.data=newData
        }
    }


}
