import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredients';
import { Favourite } from 'src/app/model/favourite';
import { FavouriteService } from '../../service/favourite.service';
import { ProfileService } from '../../service/profile.service';
import { MessageService } from 'primeng/api';
import { RecipeData } from 'src/app/model/recipeData';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            .error {
                color: red;
            }
            .success {
                color: green;
                font-weight: bold;
            }
            :host ::ng-deep .pi-times {
                font-size: 12px !important; /* Change the size as needed */
            }
            .custom-icon-class {
                height: 1.5rem !important;
                width: 1.5rem;
            }
            li {
                font-size: 18px;
            }
        `,
    ],
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {
    recipeID?: number;
    recipes: RecipeData[] = [];
    searchTerms: string[] = [];
    filteredIngredient: string[] = [];
    value?: string;
    favouritedRecipes: Favourite[];
    userId!: number;
    favorit: any = {
        createdOn: new Date(),
        title: '',
        authorId: 0,
        recipeId: 0,
    };
    constructor(
        private recipeService: RecipeService,
        private profileService: ProfileService,
        private favouritrService: FavouriteService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;
                this.favouritrService
                    .getFavouritesUser(this.userId)
                    .subscribe((result: Favourite[]) => {
                        this.favouritedRecipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes?.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
                if (this.router.url == '/myFavorite') {
                    this.favouritrService
                        .getFavouritesRecipes(this.userId)
                        .subscribe((result: Recipe[]) => {
                            this.recipes = result['data'];
                            this.recipes.forEach((r) => {
                                r.recipe.favourited = true;
                            });
                        });
                }
            },
        });

        this.route.params.subscribe((params) => {
            if (params['searchTerm']) {
                this.recipeService
                    .searchRecipe(params['searchTerm'])
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
            } else {
                this.recipeService
                    .getRecipes()
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        console.log(result['data']);
                        result['data'].forEach((r) => {
                            const favourited = this.favouritedRecipes?.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
            }
        });
    }
    async deleteFavourite(recipe: Recipe) {
        var favourite = this.favouritedRecipes.find(
            (fr) => fr.recipeId === recipe.id
        );
        await this.favouritrService.deleteFavourite(favourite.id).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Added Successfully',
                    life: 3000,
                });
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Success',
                    detail: "Error happen can't delete",
                    life: 3000,
                });
            },
        });
        new Promise((resolve) => setTimeout(resolve, 800));

        window.location.reload();
    }
    async postFavourite(recipe: Recipe) {
        this.favorit.title = '';
        this.favorit.createdOn = new Date();
        this.favorit.authorId = this.userId;
        this.favorit.recipeId = recipe.id;

        await this.favouritrService.postFavourite(this.favorit).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Added Successfully',
                    life: 3000,
                });
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Success',
                    detail: "Error happen can't Add",
                    life: 3000,
                });
            },
        });
        new Promise((resolve) => setTimeout(resolve, 800));

        window.location.reload();
    }
    searchIngredient() {
        this.recipeService
            .getIngredients()
            .subscribe((result: Ingredient[]) => {
                this.filteredIngredient = result['data'].map(
                    (ingredient) => ingredient.title
                );
            });
    }
    searchRecipes(name: string) {
        this.router.navigate(['search', { searchTerm: name }]);
    }

    addSearchTerm(searchTerm: string) {
        if (searchTerm !== '') {
            // Check if the string is already in the list.
            if (!this.searchTerms.includes(searchTerm)) {
                this.searchTerms.push(searchTerm);
                this.recipeService
                    .searchMoreRecipe(this.searchTerms)
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
            }
        } else if (this.searchTerms.length === 0) {
            this.recipeService.getRecipes().subscribe((result: Recipe[]) => {
                this.recipes = result['data'];
                this.recipes.forEach((r) => {
                    const favourited = this.favouritedRecipes.find(
                        (fr) => fr.recipeId === r.recipe.id
                    );
                    if (favourited) {
                        r.recipe.favourited = true;
                    } else {
                        r.recipe.favourited = false;
                    }
                });
            });
        }
    }

    deleteSearchTerm(searchTerm: string) {
        if (searchTerm != '') {
            const index = this.searchTerms.indexOf(searchTerm);
            if (index !== -1) {
                this.searchTerms.splice(index, 1);
            }
            if (this.searchTerms.length != 0) {
                this.recipeService
                    .searchMoreRecipe(this.searchTerms)
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
            } else {
                this.recipeService
                    .getRecipes()
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes.find(
                                (fr) => fr.recipeId === r.recipe.id
                            );
                            if (favourited) {
                                r.recipe.favourited = true;
                            } else {
                                r.recipe.favourited = false;
                            }
                        });
                    });
            }
        }
    }
    viewdetails(recipe: Recipe) {
        this.recipeID = recipe.id;
        this.router.navigate(['recipe/', { recipeId: this.recipeID }]);
    }
}
