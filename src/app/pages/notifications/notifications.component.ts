import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";

import {Router} from '@angular/router'

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../share.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
    selector: 'notifications-cmp',
   // moduleId: module.id,
    templateUrl: 'notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;
  firstFormGroup:FormGroup
  secondFormGroup:FormGroup
  thirdFormGroup:FormGroup
  fourthFormGroup:FormGroup
  isLinear = false;
  test='';
  test1=''
  dropdownList = [];
  dropdownList1 = [];
  selectedItems = [];
  vegetables =[];
  event_goals:any=[];
  storeImage;
  selectedDate=''
  fileAttr = 'Choose File';
  hoveredDate: NgbDate | null = null;
  LocalData;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  dropdownSettings:IDropdownSettings= {};
  dropdownSettings1:IDropdownSettings= {};
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  constructor(private toastr: ToastrService,private _formBuilder: FormBuilder , private calendar: NgbCalendar, public formatter: NgbDateParserFormatter , private shareService:ShareService , private route:Router) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    this.firstFormGroup = this._formBuilder.group({
      title:[''],
      start_at:[''],
      end_at:[''],
      event_users:[''],
      event_users_staff:['']

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      options:this._formBuilder.array([]),
      prizes:this._formBuilder.array([])
    })
    this.fourthFormGroup = this._formBuilder.group({
      whats_up_notification:[''],
      phone:[''],
      app_notification:[''],
      start_at:[''],
      end_at:[''],
      title:[''],
      frequency:[''],
      description:[''],

    })
  }
  ngOnInit(): void {
    this.LocalData=JSON.parse(localStorage.getItem('event_data1'))
    this.shareService.getEventData().subscribe(res=>{
      this.event_goals=res
      console.log(res);
      
    })

    this.vegetables = [
      {name: 'logistics'},
      {name: 'actor'},
    ];
    this.dropdownList = [
      {id:1, type_id: 1, item_text: 'Rahul' },
      {id:2, type_id: 2, item_text: 'Rajan' },
      {id:3,type_id: 3, item_text: 'Javed' },
      {id:4,type_id: 4, item_text: 'Saurav' },
      {id:5, type_id: 5, item_text: 'Raj' }
    ];
    this.dropdownList1 = [
      { id:1,type_id: 1, item_text: 'Rahul' },
      { id:2,type_id: 2, item_text: 'Rajan' },
      { id:3,type_id: 3, item_text: 'Javed' },
      {id:4, type_id: 4, item_text: 'Saurav' },
      { id:5,type_id: 5, item_text: 'Raj' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }



  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  showNotification(from, align) {
    const color = Math.floor(Math.random() * 5 + 1);

    switch (color) {
      case 1:
        this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
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
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = '';
    }
  }

  options(): FormArray {
    return this.thirdFormGroup.get("options") as FormArray;
  }
  newOptions(): FormGroup {
    return this._formBuilder.group({
      start_at: "",
      end_at: "",
      location:"",
      title:''
    });
  }
  addQuantity() {
    this.options().push(this.newOptions());
  }
  removeQuantity(id){
    this.options().removeAt(id);
  }
  prizes():FormArray{
    return this.thirdFormGroup.get('prizes') as FormArray;
  }

  newPrizes():FormGroup{
    return this ._formBuilder.group({
      position:'',
      max:'',
      code:''
    })
  }
  addPrizes(){
    this.prizes().push(this.newPrizes());
  }

  removePrizes(index){
    this.prizes().removeAt(index);
  }

  firstStep(){
    console.log(this.firstFormGroup.value);
  }
  thirdFormGroupData(){
    console.log(this.thirdFormGroup.value);
    
  }

  fourthFormGroupData(){
    let storeData=[]
    let event_users=[]
   if(this.LocalData.store_id){
    for(let i=0;i<this.LocalData.store_id.length;i++){
      storeData.push(this.LocalData.store_id[i].store_id)
    }
    if(this.firstFormGroup.value.event_users.length){
      let data=this.firstFormGroup.value.event_users
      this.firstFormGroup.value.event_users=[]
      for(let i=0;i<data.length;i++){
        for(let j=0;j<this.dropdownList.length;j++){
          if(this.dropdownList[j].id===data[i].id){
            const obj={
              id:this.dropdownList[i].id,
              type_id:this.dropdownList[i].type_id
            }
            event_users.push(obj)
          }

        }
     
      }
      data=[]
   }
  } 
   if(this.firstFormGroup.value.event_users_staff.length){
    let data=this.firstFormGroup.value.event_users_staff

    this.firstFormGroup.value.event_users_staff=[]
    for(let i=0;i<data.length;i++){
      for(let j=0;j<this.dropdownList.length;j++){
        if(this.dropdownList[j].id===data[i].id){
          const obj={
            id:this.dropdownList[i].id,
            type_id:this.dropdownList[i].type_id
          }
          event_users.push(obj)
        }

      }
    }
    data=[]
 } 

    const obj={
      title:this.firstFormGroup.value.title,
      store_id:storeData,
      event_model_id:this.LocalData.event_model_id,
      start_at:this.firstFormGroup.value.start_at,
      end_at:this.firstFormGroup.value.end_at,
      banner_url:this.storeImage,
      status:1,
      priority:1,
      event_users:event_users,
      event_campaigns:{
        whats_up_notification:this.fourthFormGroup.value.whats_up_notification===true?1:0,
        phone:this.fourthFormGroup.value.phone===true?1:0,
        app_notification:this.fourthFormGroup.value.app_notification==true?1:0,
        start_at:this.fourthFormGroup.value.start_at,
        end_at:this.fourthFormGroup.value.end_at,
        title:this.fourthFormGroup.value.title,
        frequency:this.fourthFormGroup.value.frequency,
        descriptions:this.fourthFormGroup.value.description,
        attachments:'heloo'

      },
      event_timelines:this.thirdFormGroup.value.options,
      event_prizes:this.thirdFormGroup.value.prizes,

    }

    console.log(obj);
    
    this.shareService.createEvent(obj).subscribe(res=>{
      localStorage.clear()
      console.log(res['data']);
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Event Created <b>.</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
        }
      );
      localStorage.setItem("save_event",JSON.stringify(res['data']))
      this.route.navigate(['/upgrade'])
    },(err)=>{
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>Failed to Upload</span>',
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


}
