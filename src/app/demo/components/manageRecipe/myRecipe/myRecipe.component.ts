import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../service/recipe.service';
import { ProfileService } from '../../../service/profile.service';
import { Router } from '@angular/router';
import { Recipe } from '../../../../model/recipe';
import { RecipeData } from 'src/app/model/recipeData';

@Component({
    selector: 'app-myRecipe',
    templateUrl: './myRecipe.component.html',
})
export class MyRecipeComponent implements OnInit {
    recipes: RecipeData[];
    userId!: number;

    constructor(
        private recipeService: RecipeService,
        private profileService: ProfileService,
        private router: Router
    ) {}

    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
        this.recipeService.getMyRecipes().subscribe((res: any) => {
            console.log(res);
            this.recipes = res.data;
            console.log(this.recipes);
        });
    }
    viewdetails(recipe: any) {
        console.log(recipe.id);
        this.router.navigate(['recipe/', { recipeId: recipe.id }]);
    }
}
