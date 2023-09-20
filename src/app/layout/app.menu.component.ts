import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'User',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/user/profile'],
                    },
                    {
                        label: 'My Recipe',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/myRecipe'],
                    },
                    {
                        label: 'My Favorite',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/myFavorite'],
                    },
                    {
                        label: 'My Calender Planes',
                        icon: 'pi pi-fw pi-calendar-plus',
                        routerLink: ['/eventcalendar'],
                    },
                ],
            },
        ];
    }
}
