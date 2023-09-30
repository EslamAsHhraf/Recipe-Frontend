import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ProfileService } from '../demo/service/profile.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private profileService: ProfileService
    ) {}

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
        ];
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.model.push({
                    label: 'User',
                    items: [
                        {
                            label: 'Profile',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/user/profile'],
                        },
                        {
                            label: 'My Recipe',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['/myRecipe'],
                        },
                        {
                            label: 'My Favorite',
                            icon: 'pi pi-fw pi-heart',
                            routerLink: ['/myFavorite'],
                        },
                        {
                            label: 'Shopping List',
                            icon: 'pi pi-fw pi-shopping-cart',
                            routerLink: ['/shopping'],
                        },
                        {
                            label: 'My Calender Planes',
                            icon: 'pi pi-fw pi-calendar-plus',
                            routerLink: ['/eventcalendar'],
                        },
                    ],
                });
            },
        });
    }
}