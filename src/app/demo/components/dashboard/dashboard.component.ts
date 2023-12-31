import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredients';
import { Favourite } from 'src/app/model/favourite';
import { FavouriteService } from '../../service/favourite.service';
import { ProfileService } from '../../service/profile.service';
import { MessageService } from 'primeng/api';
import { PageEvent } from 'src/app/model/pageEvent';

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
            .fav {
                width: fit-content;
            }
            .fav:hover {
                cursor: pointer;
            }
        `,
    ],
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {
    recipeID?: number;
    recipes: Recipe[] = [];
    searchTerms: string[] = [];
    filteredIngredient: string[] = [];
    value?: string;
    favouritedRecipes: Favourite[];
    userId: number = -1;
    favorit: any = {
        createdOn: new Date(),
        title: '',
        authorId: 0,
        recipeId: 0,
    };
    num: boolean = true;
    first: number = 0;
    rows: number = 6;

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
                this.userId = res?.data?.id;
                if (this.router.url == '/myFavorite') {
                    this.favouritrService
                        .getFavouritesRecipes(this.userId)
                        .subscribe({
                            next: (res) => {
                                this.recipes = res['data'];
                                this.recipes.forEach((r) => {
                                    r.favourited = true;
                                });
                            },
                            error: () => {
                                this.num = false;
                            },
                        });
                } else {
                    this.route.params.subscribe((params) => {
                        if (params['searchTerm']) {
                            this.recipeService
                                .searchRecipe(params['searchTerm'])
                                .subscribe({
                                    next: (res) => {
                                        this.recipes = res['data'];
                                        this.recipes.forEach((r) => {
                                            const favourited =
                                                this.favouritedRecipes.find(
                                                    (fr) => fr.recipeId === r.id
                                                );
                                            if (favourited) {
                                                r.favourited = true;
                                            } else {
                                                r.favourited = false;
                                            }
                                        });
                                        if (this.recipes.length == 0) {
                                            this.num = false;
                                        }
                                    },
                                });
                        } else {
                            this.recipeService
                                .getRecipes()
                                .subscribe((result: Recipe[]) => {
                                    this.recipes = result['data'];
                                    result['data'].forEach((r) => {
                                        const favourited =
                                            this.favouritedRecipes?.find(
                                                (fr) =>
                                                    fr.recipeId === r.recipe.id
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
                this.favouritrService
                    .getFavouritesUser(this.userId)
                    .subscribe((result: Favourite[]) => {
                        this.favouritedRecipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes?.find(
                                (fr) => fr.recipeId === r.id
                            );
                            if (favourited) {
                                r.favourited = true;
                            } else {
                                r.favourited = false;
                            }
                        });
                    });
            },
            error: (err) => {
                this.route.params.subscribe((params) => {
                    if (params['searchTerm']) {
                        this.recipeService
                            .searchRecipe(params['searchTerm'])
                            .subscribe((result: Recipe[]) => {
                                this.recipes = result['data'];
                                if (this.recipes.length == 0) {
                                    this.num = false;
                                }
                            });
                    } else {
                        this.recipeService
                            .getRecipes()
                            .subscribe((result: Recipe[]) => {
                                this.recipes = result['data'];
                            });
                    }
                });
            },
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
        setTimeout(() => {
            // Reload the current page after the pause
            window.location.reload();
        }, 800);
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
        setTimeout(() => {
            // Reload the current page after the pause
            window.location.reload();
        }, 800);
    }
    isMyFavoriteRoute(): boolean {
        return this.router.url === '/myFavorite';
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
    routeRecipes() {
        this.router.navigate(['./']);
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
                                (fr) => fr.recipeId === r.id
                            );
                            if (favourited) {
                                r.favourited = true;
                            } else {
                                r.favourited = false;
                            }
                        });
                        if (this.recipes.length == 0) {
                            this.num = false;
                        }
                    });
            }
        } else if (this.searchTerms.length === 0) {
            this.recipeService.getRecipes().subscribe((result: Recipe[]) => {
                this.recipes = result['data'];
                this.recipes.forEach((r) => {
                    const favourited = this.favouritedRecipes.find(
                        (fr) => fr.recipeId === r.id
                    );
                    if (favourited) {
                        r.favourited = true;
                    } else {
                        r.favourited = false;
                    }
                });
                if (this.recipes.length == 0) {
                    this.num = false;
                }
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
                                (fr) => fr.recipeId === r.id
                            );
                            if (favourited) {
                                r.favourited = true;
                            } else {
                                r.favourited = false;
                            }
                        });
                        if (this.recipes.length == 0) {
                            this.num = false;
                        }
                    });
            } else {
                this.recipeService
                    .getRecipes()
                    .subscribe((result: Recipe[]) => {
                        this.recipes = result['data'];
                        this.recipes.forEach((r) => {
                            const favourited = this.favouritedRecipes.find(
                                (fr) => fr.recipeId === r.id
                            );
                            if (favourited) {
                                r.favourited = true;
                            } else {
                                r.favourited = false;
                            }
                        });
                        if (this.recipes.length == 0) {
                            this.num = false;
                        }
                    });
            }
        }
    }
    viewdetails(recipe: Recipe) {
        this.recipeID = recipe.id;
        this.router.navigate(['recipe/', { recipeId: this.recipeID }]);
    }
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
}
