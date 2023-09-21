import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Rating } from 'src/app/model/rating';
import { UserService } from '../../service/user.service';
import { PlanMealsService } from '../../service/planmeals.service';
import { ShoppingService } from '../../service/shopping.service';

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
    SelectedDateDialog = false;

    recipeUser: any;
    recipeUserImage: any;
    ratedbefore: boolean = false;
    plan: any = {
        title: '',
        authorId: 0,
        recipeId: 0,
        dateOn: new Date(),
    };
    recipedate: Date;
    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private userService: UserService,
        private planmealService: PlanMealsService,
        private shoppingServices: ShoppingService
    ) {}
    gotoEdit() {
        this.router.navigate(['editRecipe/', { recipeId: this.recipeId }]);
    }
    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;

                this.recipeService.getRecipebyid(this.recipeId).subscribe({
                    next: (result: Recipe) => {
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
                    },
                    error: () => {
                        this.router.navigate(['./notfound']);
                    },
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
                    detail: 'added success',
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
    gotoAddPlan() {
        this.SelectedDateDialog = true;
    }
    addrecipeplan() {
        this.plan.authorId = this.userId;
        this.plan.title = this.recipe['item1'].title;
        this.plan.recipeId = this.recipe['item1'].id;
        this.recipedate.setDate(this.recipedate.getDate() + 1);

        this.plan.dateOn = this.recipedate;
        console.log(this.recipedate);
        console.log(this.plan);
        this.planmealService.postPlan(this.plan).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'added success',
                    life: 3000,
                });
                new Promise((resolve) => setTimeout(resolve, 1000));

                window.location.reload();
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
    addShopping() {
        var products = this.recipe['item2'].map((val) => ({
            createdBy: this.userId,
            quantityShopping: 1,
            quantityPurchased: 0,
            title: val.title,
        }));
        this.shoppingServices.addShopping(products).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Add Products',
                    life: 3000,
                });
                setTimeout(() => {
                    this.router.navigate(['./shopping']);
                }, 2000); // 3000 milliseconds (3 seconds)
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'error in add products',
                    life: 3000,
                });
            },
        });
    }
}
