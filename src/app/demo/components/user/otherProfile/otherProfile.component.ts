import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/demo/service/profile.service';
import { UserService } from 'src/app/demo/service/user.service';
import { PageEvent } from 'src/app/model/pageEvent';
import { Profile } from 'src/app/model/profile';
import { Recipe } from 'src/app/model/recipe';
@Component({
    selector: 'app-otherProfile',
    templateUrl: './otherProfile.component.html',
    styles: [
        `
            @media screen and (max-width: 767px) {
                .image {
                    order: -1;
                }
            }
            .blue-text {
                color: #6366f1;
            }
        `,
    ],
})
export class OtherProfileComponent implements OnInit {
    userId: number;
    profile: Profile = {
        id: 0,
        name: '',
        imageFile: '',
    };
    recipes: Recipe[];
    first: number = 0;
    rows: number = 4;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                if (res.data.id == this.userId) {
                    this.router.navigate(['./user/profile']);
                }
                    this.userService.getUser(this.userId).subscribe({
                        next: (res: any) => {
                            this.profile = res.data;
                            this.userService
                                .getRecipesOfUser(this.userId)
                                .subscribe((res: any) => {
                                    console.log(res);
                                    this.recipes = res.data;
                                });
                        },
                        error: () => {
                            this.router.navigate(['./notfound']);
                        },
                    });
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
    }
    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
    viewdetails(recipe: any) {
        console.log(recipe.id);
        this.router.navigate(['recipe/', { recipeId: recipe.id }]);
    }
}
