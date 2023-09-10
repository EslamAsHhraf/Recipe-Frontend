import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from 'src/app/demo/service/recipe.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-editResipe',
    templateUrl: './editRecipe.component.html',
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
export class EditRecipeComponent implements OnInit {
    error: boolean[] = [false, false, false, false, false];

    recipeId?: number;
    steps: string[] = [];
    oneStep: string;
    errorMessage: string = '';

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        private messageService:MessageService
    ) {}
    recipe: Recipe = {
        title: '',
        description: '',
        steps: '',
        category: 0,
        createdBy: 0,
        totalRating: 0,
        imageFile: '',
    };
    ngOnInit() {
        this.recipeId = parseInt(this.route.snapshot.params['recipeId']);
        this.recipeService.getRecipebyid(this.recipeId).subscribe({
            next: (res: any) => {
                this.recipe.title = res?.item1?.title;
                this.recipe.description = res?.item1?.description;
                this.steps = res?.item1?.steps.split('*');
            },
            error: () => {
                this.router.navigate(['./login']);
            },
        });
        console.log(this.recipeId);
    }
    AddStep() {
        console.log(this.oneStep.trim());
        if (this.oneStep.includes('*') || this.oneStep.trim() == '') {
            this.error[2] = true;
        } else {
            this.error[2] = false;
            this.steps.push(this.oneStep.trim());
            this.oneStep = '';
        }
    }
    deleteStep(index: number) {
        this.steps.splice(index, 1);
    }
    onSubmit() {
        this.errorMessage = '';
        this.error[0] = this.recipe.title.trim() == '' ? true : false;
        this.error[1] = this.recipe.description.trim() == '' ? true : false;
        this.error[2] = this.steps.length == 0 ? true : false;
        this.recipe.steps = this.steps.join('*');

        this.recipeService.editRecipe(this.recipe, this.recipeId).subscribe({
            next: (res: any) => {
                this.errorMessage = '';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Edit Recipe',
                    life: 3000,
                });
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
