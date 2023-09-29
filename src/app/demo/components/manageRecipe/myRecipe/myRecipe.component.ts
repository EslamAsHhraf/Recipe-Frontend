import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../service/recipe.service';
import { ProfileService } from '../../../service/profile.service';
import { Router } from '@angular/router';
import { Recipe } from '../../../../model/recipe';
import { PageEvent } from 'src/app/model/pageEvent';

@Component({
    selector: 'app-myRecipe',
    templateUrl: './myRecipe.component.html',
})
export class MyRecipeComponent implements OnInit {
    recipes: Recipe[];
    userId!: number;
    first: number = 0;
    rows: number = 6;
    constructor(
        private recipeService: RecipeService,
        private profileService: ProfileService,
        private router: Router
    ) {}

    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.id;
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
        this.recipeService.getMyRecipes().subscribe((res: any) => {
            console.log(res);
            this.recipes = res.data;
        });
    }
    viewdetails(recipe: any) {
        console.log(recipe.id);
        this.router.navigate(['recipe/', { recipeId: recipe.id }]);
    }
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
