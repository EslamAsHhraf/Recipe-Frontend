import { Component, Input, OnInit ,Output } from '@angular/core';
import { Ingredient } from '../../../model/Ingredients';
import { IngredientService } from '../../service/ingredient.service';

@Component({
    templateUrl: './ingredients.component.html',
})
export class ingredientsComponent implements OnInit {

    ingredients : Ingredient[]=[];

    constructor(private ingredientService: IngredientService) {}

    ngOnInit() {
        this.ingredientService.getIngredients()
        .subscribe((result:Ingredient[]) =>{ this.ingredients = result,console.log(this.ingredients)});
        console.log(this.ingredients);
    }



}
