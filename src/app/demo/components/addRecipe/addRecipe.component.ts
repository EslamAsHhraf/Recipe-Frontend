import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/Recipe';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/demo/service/category.service';
import { RecipeService } from 'src/app/demo/service/recipe.service';
import { MessageService } from 'primeng/api';
import { RecipeIngredientsServices } from 'src/app/demo/service/recipeIngredients.services';
import { ProfileService } from 'src/app/demo/service/profile.service';

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
        `,
    ],
    providers: [MessageService],
})
export class AddRecipeComponent implements OnInit {
    userId!: number;
    error: boolean[] = [false, false, false, false, false];
    category: Category[];
    ingredients: string[] | undefined;
    selectedFile: FormData|undefined;
    steps: string[];
    oneStep: string;
    recipe: Recipe = {
        title: '',
        description: '',
        steps: '',
        category: 0,
        createdBy: 0,
        totalRating: 0,
        imageFile: '',
    };
    separatorExp: RegExp = /,| /;
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
            console.log(res.data);
        });
    }
    onFileSelect(event: any) {
        console.log(event.currentFiles);
        const formData = new FormData();
        // Handle the selected file here
        if (event.currentFiles.length > 0) {
            const selectedFile = event.currentFiles[0];
             formData.append('ImageFile', selectedFile);
        }
        // You can perform further actions, such as file validation or upload, here
    }
    onSubmit() {
        this.recipe.category = this.selectedCategory.id;
        this.recipe.createdBy = this.userId;
        this.errorMessage = '';
        this.error[0] = this.recipe.title == '' ? true : false;
        this.error[1] = this.recipe.description == '' ? true : false;
        this.error[2] = this.recipe.steps == '' ? true : false;
        this.error[4] = this.selectedFile == undefined? true : false;

        if (!this.error.some((item) => item === true)) {
            this.recipeService.addRecipe(this.recipe).subscribe({
                next: (res: any) => {
                    console.log(res.data.data);
                    for (let i in this.ingredients) {
                        this.recipeIngredientsServices
                            .addRecipeIngredients({
                                recipeId: res.data.data.result.id,
                                title: this.ingredients[i],
                                quantity: 'string',
                            })
                            .subscribe({});
                    }
                    this.errorMessage = '';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Add New Recipe',
                        life: 3000,
                    });
                    console.log(res.data);
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
