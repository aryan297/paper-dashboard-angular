import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from '../share.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html',
    styleUrls: ['./typography.component.scss']
})

export class TypographyComponent implements OnInit{
    @ViewChild('fileInput') fileInput: ElementRef;
    Form:FormGroup
    event_goal:any=[]
    fileAttr=''
    LocalData;
    storeImage=''
    dropdownList=[]
    dropdownList1=[]
    dropdownSettings1:IDropdownSettings= {};
    dropdownSettings:IDropdownSettings= {};
    constructor(private fb:FormBuilder, private shareService:ShareService, private toastr: ToastrService){

        this.shareService.getEventData().subscribe(res=>{
            this.event_goal=res['data']
            console.log(this.event_goal);
            
        })

        this.shareService.getAllEvent().subscribe(res=>{
            console.log(res);
            
        })
        this.Form=this.fb.group({
            title:[''],
            mode:[''],
            banner_url:[''],
            est_reach:[''],
            est_budget:[''],
            event_goal_id:[''],
            event_days:[''],
            status:[''],
            event_metrics:[''],
            event_user_types:['']
        })

    }
    uploadFileEvt(imgFile: any) {
        const formData = new FormData();
        formData.append("image", imgFile.target.files[0]);
        console.log(imgFile);
        this.shareService.uploadImage(formData).subscribe(res=>{
            console.log(res['data']['url'])
            this.storeImage=res['data']
            console.log(this.storeImage,"store here");
            
        })
        console.log(imgFile.target.files[0],'data');
        if (imgFile.target.files && imgFile.target.files[0]) {
          this.fileAttr = '';
          Array.from(imgFile.target.files).forEach((file: any) => {
            this.fileAttr += file.name + ' - ';
          });
          // HTML5 FileReader API
          let reader = new FileReader();
          reader.onload = (e: any) => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = (rs) => {
              let imgBase64Path = e.target.result;
            };
          };
          reader.readAsDataURL(imgFile.target.files[0]);
          console.log(imgFile.target.files[0]);
          const obj={
              type:'model',
              image:imgFile
          }
          // Reset if duplicate image uploaded again
          this.fileInput.nativeElement.value = '';
        } else {
          this.fileAttr = '';
        }
      }
    save(){
        console.log(this.storeImage);
        this.Form.value.banner_url=this.storeImage
        if(this.Form.value.event_metrics.length){
            let data=this.Form.value.event_metrics
            this.Form.value.event_metrics=[]
            for(let i=0;i<data.length;i++){
                this.Form.value.event_metrics.push(data[i].id)
            }
            data=[]
         }

         if(this.Form.value.event_user_types.length){
            let data=this.Form.value.event_user_types
            this.Form.value.event_user_types=[]
            for(let i=0;i<data.length;i++){
                this.Form.value.event_user_types.push(data[i].id)
            }
            data=[]
         }
        console.log( this.Form.value.event_user_types);
        
        if(this.Form.value.event_goal_id){
        this.Form.value.event_goal_id=JSON.parse(this.Form.value.event_goal_id)
        }
        if(this.Form.value.status){
        this.Form.value.status=JSON.parse(this.Form.value.status)
        }
         this.shareService.postEventData(this.Form.value).subscribe(res=>{
            console.log(res['error']);
                this.toastr.success(
                    '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully added</span>',
                    "",
                    {
                      timeOut: 4000,
                      closeButton: true,
                      enableHtml: true,
                      toastClass: "alert alert-success alert-with-icon"
                    }
                  );
            
        },(err)=>{

            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Failed to Save</span>',
                  "",
                  {
                    timeOut: 4000,
                    enableHtml: true,
                    closeButton: true,
                    toastClass: "alert alert-danger alert-with-icon",
                  }
                );
        })
    }

    ngOnInit(): void {

        this.dropdownList = [
            { id: 1, success_matrix: 'download'},
            { id: 2, success_matrix: 'retention'},
            { id: 3, success_matrix: 'order'},
          ];
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'success_matrix',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };

          this.dropdownList1 = [
            {id:1, name:"Admin"}, 
            {id:2, name: "Staff"}, 
            {id:3, name:"Logistics"}, 
            {id:4, name: "Flowers"}, 
            {id:5, name:"Bannerist"}
          ];
          this.dropdownSettings1 = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true
          };
        
    }

    
}
