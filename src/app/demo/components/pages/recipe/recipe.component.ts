import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from '../../../service/recipe.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
})
export class recipeComponent implements OnInit {

    @Input() recipeId?: number;
    recipe?:Recipe;

    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        console.log(this.recipeId);
        this.recipeService.getRecipebyid(this.recipeId)
        .subscribe((result:Recipe) => this.recipe = result);
        console.log(this.recipe)
        }

}
