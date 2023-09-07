import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../model/Recipe';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/demo/service/category.service';
import { RecipeService } from 'src/app/demo/service/recipe.service';
import { AlertifyService } from 'src/app/demo/service/alertify.service';
import { MessageService } from 'primeng/api';
import { IngredientService } from 'src/app/demo/service/ingredient.service';
import { Ingredient } from 'src/app/model/Ingredients';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
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
        `,
    ],
    providers: [MessageService],
})
export class AddRecipeComponent implements OnInit {
    @Input() userId!: number;
    error: boolean[] = [false, false, false, false];
    category: Category[];
    ingredient:Ingredient[];
    recipe: Recipe = {
        title: '',
        description: '',
        steps: '',
        category: 0,
        createdBy: 0,
        totalRating: 0,
        imageFile: '',
    };
    selectedCategory: Category;
    errorMessage: string = '';
    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private ingredientService: IngredientService
    ) {}

    ngOnInit() {
        this.categoryService.getall().subscribe((res: any) => {
            this.category = res.data;
            console.log(res.data);
        });
        this.ingredientService.gwtIngredients().subscribe((res: any) => {
            this.ingredient = res;
          this.ingredient = this.ingredient.map((obj) => ({
              ...obj,
              check: false,
              quantity:null
          }));

            console.log(this.ingredient);
        });
    }
    onSubmit() {
        console.log(this.ingredient);
        this.recipe.category = this.selectedCategory.id;
        this.recipe.createdBy = this.userId;
        this.errorMessage = '';
        this.error[0] = this.recipe.title == '' ? true : false;
        this.error[1] = this.recipe.description == '' ? true : false;
        this.error[2] = this.recipe.steps == '' ? true : false;

        if (!this.error.some((item) => item === true)) {
            this.recipeService.addRecipe(this.recipe).subscribe({
                next: (res:any) => {
                    this.errorMessage = '';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Add New Recipe',
                        life: 3000,
                    });
                    console.log(res.data.result.id);
                    setTimeout(() => {
                        this.router.navigate(['./']);
                    }, 3000); // 3000 milliseconds (3 seconds)
                },
                error: (err) => {
                    // put error message
                    if (err.status == 401) {
                    } else {
                        console.log(err);
                        this.errorMessage =
                            'title' in err.error.data
                                ? err?.error.data?.title
                                : 'Error, Can you try again after 5 Minutes';
                    }
                },
            });
        }
    }
}
