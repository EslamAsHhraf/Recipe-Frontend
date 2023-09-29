import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Recipe } from '../model/recipe';
import { Router } from '@angular/router';
import { ProfileService } from '../demo/service/profile.service';
import { Profile } from '../model/profile';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    recipes: Recipe[] = [];
    login: boolean = false;
    profile: Profile = {
        id: 0,
        name: '',
        imageFile: '',
    };
    userImage: any;
    items: MenuItem[] | undefined;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private profileService: ProfileService
    ) {}
    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.profile.id = res?.data?.id;
                this.profile.name = res?.data?.name;
                this.userImage = res?.data?.imageFile;
                this.login = true;
            },
        });
        this.items = [
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => {
                            this.router.navigate(['user/profile']);
                        },
                    },
                    {
                        label: 'Sign out',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.logout();
                        },
                    },
                ],
            },
        ];
    }
    searchRecipes(name: string) {
        this.router.navigate(['search', { searchTerm: name }]);
    }

    myRecipes() {
        this.router.navigate(['./myRecipe']);
    }
    logout() {
        this.profileService.logout().subscribe({
            next: () => {
                this.router.navigate(['./auth/login']);
            },
            error: (err) => {
                this.router.navigate(['./auth/login']);
            },
        });
    }
}
