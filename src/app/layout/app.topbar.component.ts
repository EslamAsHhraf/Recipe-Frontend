import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { RecipeService } from '../demo/service/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    recipes :Recipe[]=[];
    
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,public recipeService:RecipeService) { }

    searchRecipes(name:string){
        this.recipeService.searchRecipe(name)
        .subscribe((result:Recipe[]) => this.recipes = result);
    }
    
}
