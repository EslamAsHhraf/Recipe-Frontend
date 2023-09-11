import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/Ingredients';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    recipeID?:number;
    recipes :Recipe[]=[];
    searchTerms: string[] = [];
    filteredIngredient:string[]=[];
    value?:string;
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) {}


    ngOnInit() {
      this.route.params.subscribe((params) => {
        if (params['searchTerm']) {
          this.recipeService.searchRecipe(params['searchTerm'])
          .subscribe((result: Recipe[]) => this.recipes = result);
        } else {
          this.recipeService.getRecipes()
          .subscribe((result: Recipe[]) => this.recipes = result);
        }
      });
      
    }
    searchIngredient() {
      this.recipeService.getIngredients().subscribe((result:Ingredient[]) => {
        this.filteredIngredient = result.map(ingredient => ingredient.title);
      });   
    }


    addSearchTerm(searchTerm: string) {
        if (searchTerm !== '') {
          // Check if the string is already in the list.
          if (!this.searchTerms.includes(searchTerm)) {
            this.searchTerms.push(searchTerm);
            this.recipeService.searchMoreRecipe(this.searchTerms)
              .subscribe((result: Recipe[]) => this.recipes = result);
          }
        } else if (this.searchTerms.length === 0) {
          this.recipeService.getRecipes()
            .subscribe((result: Recipe[]) => this.recipes = result);
        }
      }

    deleteSearchTerm(searchTerm: string) {
        if(searchTerm!=""){
        const index = this.searchTerms.indexOf(searchTerm);
        if (index !== -1) {
          this.searchTerms.splice(index, 1);
        }
        if(this.searchTerms.length!=0){
        this.recipeService.searchMoreRecipe(this.searchTerms)
              .subscribe((result: Recipe[]) => this.recipes = result);
        }else{
            this.recipeService.getRecipes()
                .subscribe((result:Recipe[]) => this.recipes = result);
        }
        }
    }
    viewdetails(recipe:Recipe){
        this.recipeID = recipe.id;
        this.router.navigate(['recipe/',{ recipeId: this.recipeID }]);
    }

}


