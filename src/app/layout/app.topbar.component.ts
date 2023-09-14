import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Recipe } from '../model/recipe';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    recipes: Recipe[] = [];
    login: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private cookieService: CookieService
    ) {}
    ngOnInit() {
        this.login = this.cookieService.check("token");
        console.log(this.login)
    }
    searchRecipes(name: string) {
        this.router.navigate(['search', { searchTerm: name }]);
    }

    myRecipes() {
        this.router.navigate(['./myRecipe']);
    }
}
