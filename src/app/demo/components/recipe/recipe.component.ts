import { Component,  OnInit  } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from '../../service/profile.service';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
})
export class recipeComponent implements OnInit {

    recipeId?: number;
    recipe : Recipe;
    stepsList:string[];
    userId!: number;
    auth?:boolean;
    constructor(private recipeService: RecipeService ,private route: ActivatedRoute,
      private profileService: ProfileService,
      private router: Router,

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

        this.recipeId = parseInt(this.route.snapshot.params['recipeId']);
        
        this.recipeService.getRecipebyid(this.recipeId).subscribe((result:Recipe) => {

          this.recipe = result;
          let stepsist = this.recipe["item1"].steps.split('\n');
          this.stepsList = stepsist;
          console.log(this.recipe);
          if(this.userId === this.recipe["item3"]["item2"])
          {
            this.auth=true;
          }
          else{
            this.auth=false;
          }
        });
        
      }
      

    

}
