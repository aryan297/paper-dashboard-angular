import { Component,OnInit } from '@angular/core';
import { ShareService } from '../share.service';
import {Router} from '@angular/router'


@Component({
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html',
    styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {

    EventData;

    constructor(private shareService:ShareService, private route:Router ){


    }
    ngOnInit() {
        this.shareService.getAllEvent().subscribe(res=>{
            this.EventData=res['results']
            
        })

    }

    save(data){
        localStorage.clear()
        localStorage.setItem("save_event",JSON.stringify(data))
        this.route.navigate(['/upgrade'])
    }
}
