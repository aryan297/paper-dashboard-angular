import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Goal Setting',      icon:'nc-diamond',    class: '' },
    { path: '/event',         title: 'Event List',      icon:'nc-pin-3',      class: '' },
    { path: '/create',        title: 'Create Event',                   icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/template',      title: 'template List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Event Template',        icon:'nc-caps-small', class: '' },
    { path:  '/upgrade' ,     title:'upgrade',            icon :'nc-caps-small', class:''}
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
