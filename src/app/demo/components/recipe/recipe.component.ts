import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Rating } from 'src/app/model/rating';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    providers: [ConfirmationService, MessageService],
})
export class recipeComponent implements OnInit {
    recipeId?: number;
    recipe: Recipe;
    stepsList: string[];
    userId!: number;
    auth?: boolean;
    reciperating: any[];
    rating: Rating = {
        rate: 0,
        title: '',
        authorId: 0,
        recipeId: 0,
    };
    recipeUser: any;
    recipeUserImage: any;
    ratedbefore: boolean = false;

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private userService: UserService
    ) {}
    gotoEdit() {
        this.router.navigate(['editRecipe/', { recipeId: this.recipeId }]);
    }
    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;

                this.recipeService
                    .getRecipebyid(this.recipeId)
                    .subscribe((result: Recipe) => {
                        this.recipe = result['data'];
                        let stepsist = this.recipe['item1'].steps.split('*');
                        this.stepsList = stepsist;
                        if (this.userId === this.recipe['item3']['item2']) {
                            this.auth = true;
                        } else {
                            this.auth = false;
                        }
                        this.userService
                            .getUser(this.recipe['item3']['item2'])
                            .subscribe((result: any) => {
                                this.recipeUser = result['data'];
                                this.recipeUserImage =
                                    result?.data?.image?.fileContents;
                            });
                    });
                this.reciperating = [];
                var ratedUser;
                var ratedUserImage;
                this.recipeService
                    .getRecipeRating(this.recipeId)
                    .subscribe((result: Rating[]) => {
                        for (let rate of result['data']) {
                            if (this.userId === rate['authorId']) {
                                this.ratedbefore = true;
                            }
                            this.userService
                                .getUser(rate['authorId'])
                                .subscribe((res: any) => {
                                    ratedUser = res?.data?.user;
                                    ratedUserImage =
                                        res?.data?.image?.fileContents;
                                    this.reciperating.push({
                                        rate: rate,
                                        ratedUser: ratedUser,
                                        ratedUserImage: ratedUserImage,
                                    });
                                });
                        }
                    });
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });

        this.recipeId = parseInt(this.route.snapshot.params['recipeId']);

        this.recipeService
            .getRecipebyid(this.recipeId)
            .subscribe((result: Recipe) => {
                this.recipe = result;
                let stepsist = this.recipe['item1'].steps.split('*');
                this.stepsList = stepsist;
                if (this.userId === this.recipe['item3']['item2']) {
                    this.auth = true;
                } else {
                    this.auth = false;
                }
            });
    }
    confirm1() {
        var res = this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Are you sure to delete this recipe?',

            accept: () => this.acceptres(),
        });
        console.log(res);
    }
    acceptres() {
        this.recipeService.deleteRecipe(this.recipeId).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Delete Successfully',
                    life: 3000,
                });

                setTimeout(() => {
                    this.router.navigate(['./myRecipe']);
                }, 3000); // 3000 milliseconds (3 seconds)
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Success',
                    detail: "Error happen can't Delete",
                    life: 3000,
                });
            },
        });
    }

    onSubmit(rate, title) {
        this.rating.rate = rate;
        this.rating.title = title;
        this.rating.authorId = this.userId;
        this.rating.recipeId = this.recipeId;
        this.recipeService.postRating(this.rating).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res['data'],
                    life: 3000,
                });
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'error',
                    detail: err['data'],
                    life: 3000,
                });
            },
        });
    }
}
