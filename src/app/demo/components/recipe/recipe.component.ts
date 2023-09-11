import { Component,  OnInit  } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from '../../service/profile.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    providers: [ConfirmationService, MessageService]

})
export class recipeComponent implements OnInit {
    recipeId?: number;
    recipe: Recipe;
    stepsList: string[];
    userId!: number;
    auth?: boolean;
    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private router: Router
        , private confirmationService: ConfirmationService
        , private messageService: MessageService
    ) {}
    gotoEdit() {
        this.router.navigate(['editRecipe/',{ recipeId: this.recipeId }]);
    };
    ngOnInit() {
                this.recipeId = parseInt(
                    this.route.snapshot.params['recipeId']
                );

        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;

            this.recipeService
                .getRecipebyid(this.recipeId)
                .subscribe((result: Recipe) => {
                    this.recipe = result;
                    let stepsist = this.recipe['item1'].steps.split('*');
                    this.stepsList = stepsist;
                    console.log(this.userId);
                    console.log(this.recipe['item3']['item2']);
                    if (this.userId === this.recipe['item3']['item2']) {
                        this.auth = true;
                    } else {
                        this.auth = false;
                    }
                });
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
    }
    confirm1() {
        var res =this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Are you sure to delete this recipe?',

            accept: () => this.acceptres()
        })
        console.log(res)
    }
    acceptres(){
        this.recipeService.deleteRecipe(this.recipeId).subscribe(
            {
                next: (res)=>{
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Success',
                        detail: 'Delete Successfully',
                        life: 3000,
                    });

                    setTimeout(() => {
                        this.router.navigate(['./myRecipe']);
                    }, 3000); // 3000 milliseconds (3 seconds)
                }
            }
        );

    }

}
