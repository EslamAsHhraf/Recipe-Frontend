import { Component, Input, OnInit ,Output } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
})
export class recipeComponent implements OnInit {

    recipeId?: number;
    recipe : Recipe;

    constructor(private recipeService: RecipeService ,private route: ActivatedRoute,) {}

     ngOnInit() {
      this.recipeId = parseInt(this.route.snapshot.params['recipeId']);
       this.recipeService.getRecipebyid(this.recipeId)
        .subscribe((result:Recipe) => {this.recipe = result;console.log(this.recipe);});
        console.log(this.recipe);
    }

    

}
