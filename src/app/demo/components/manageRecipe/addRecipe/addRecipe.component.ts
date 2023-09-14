import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/demo/service/category.service';
import { RecipeService } from 'src/app/demo/service/recipe.service';
import { MessageService } from 'primeng/api';
import { RecipeIngredientsServices } from 'src/app/demo/service/recipeIngredients.service';
import { ProfileService } from 'src/app/demo/service/profile.service';
import { Ingredient } from 'src/app/model/ingredients';

@Component({
    selector: 'app-addRecipe',
    templateUrl: './addRecipe.component.html',
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
export class AddRecipeComponent implements OnInit {
    userId!: number;
    error: boolean[] = [false, false, false, false, false];
    category: Category[];
    ingredients: string[] | undefined;
    selectedFile: FormData = new FormData();
    steps: string[] = [];
    oneStep: string;
    editIndex: number=-1;
    recipe: Recipe = {
        title: '',
        description: '',
        steps: '',
        category: 0,
        createdBy: 0,
        totalRating: 0,
        imageFile: '-',
    };
    selectedCategory: Category;
    errorMessage: string = '';
    constructor(
        private profileService: ProfileService,
        private recipeService: RecipeService,
        private router: Router,
        private categoryService: CategoryService,
        private messageService: MessageService,
        private recipeIngredientsServices: RecipeIngredientsServices
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
        this.categoryService.getall().subscribe((res: any) => {
            this.category = res.data;
        });
    }
    onFileSelect(event: any) {
        console.log(event.currentFiles);
        // Handle the selected file here
        if (event.currentFiles.length > 0) {
            this.selectedFile.append('imageFile', event.currentFiles[0]);
            console.log(this.selectedFile);
        }
        // You can perform further actions, such as file validation or upload, here
    }
    AddStep() {
        if (this.oneStep.includes('*') || this.oneStep.trim() == '') {
            this.error[2] = true;
        } else {
            this.error[2] = false;
            if (this.editIndex == -1) {
                this.steps.push(this.oneStep.trim());
            } else {
                this.steps[this.editIndex] = this.oneStep;
                this.editIndex = -1;
            }
            this.oneStep = '';
        }
    }
    // Function to delete an item from the array by index
    deleteStep(index: number) {
        this.steps.splice(index, 1);
    }
    editStep(index: number) {
        this.oneStep = this.steps[index];
        this.editIndex = index;
    }
    onSubmit() {
        this.recipe.category = this.selectedCategory.id;
        this.recipe.createdBy = this.userId;
        this.errorMessage = '';
        this.error[0] = this.recipe.title.trim() == '' ? true : false;
        this.error[1] = this.recipe.description.trim() == '' ? true : false;
        this.error[2] = this.steps.length == 0 ? true : false;
        this.error[3] = this.selectedFile.has('imageFile') ? false : true;
        this.recipe.steps = this.steps.join('*');
        var ingredientsData: Ingredient[] = [];
        if (!this.error.some((item) => item === true)) {
            this.recipeService
                .addRecipe(this.recipe, this.selectedFile)
                .subscribe({
                    next: (res: any) => {
                        this.ingredients.forEach((element, index) => {
                            ingredientsData.push({
                                title: element,
                                recipeId: res.data.id,
                            });
                        });
                        this.recipeIngredientsServices
                            .addListIngredients(ingredientsData)
                            .subscribe({});
                        this.errorMessage = '';
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Add New Recipe',
                            life: 3000,
                        });

                        setTimeout(() => {
                            this.router.navigate(['./myRecipe']);
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
