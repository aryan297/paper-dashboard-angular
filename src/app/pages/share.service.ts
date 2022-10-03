import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  event_model:string=environment.link+"api/v1/event-models/create";
  event_goals:string = environment.link +'api/v1/event-goals'
  event_models:string= environment.link +'api/v1/event-models'
  image_upload:string=environment.link+'api/v1/image/upload'
  create_event:string=environment.link +'api/v1/events/create'
  get_event:string=environment.link +'api/v1/events'
  constructor(private http:HttpClient ) 
  {
   }

   postEventData(data){
     return this.http.post(this.event_model,data)
   }

   getEventData(){
     return this.http.get(this.event_goals)
   }

   getEventModel(){
     return this.http.get(this.event_models)
   }
   uploadImage(data){
     return this.http.post(this.image_upload,data)
   }

   createEvent(data){
     return this.http.post(this.create_event,data)
   }

   getAllEvent(){
     return this.http.get(this.get_event)
   }
}
