import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Recipe } from '../model/recipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    recipes: Recipe[] = [];
    login: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) {}
    ngOnInit() {
    }
    searchRecipes(name: string) {
        this.router.navigate(['search', { searchTerm: name }]);
    }

    myRecipes() {
        this.router.navigate(['./myRecipe']);
    }
}
