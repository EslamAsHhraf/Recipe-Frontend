import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredients';
import { Favourite } from 'src/app/model/favourite';
import { FavouriteService } from '../../service/favourite.service';
import { ProfileService } from '../../service/profile.service';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {

    recipeID?:number;
    recipes :Recipe[]=[];
    searchTerms: string[] = [];
    filteredIngredient:string[]=[];
    value?:string;
    favouritedRecipes:Favourite[];
    userId!: number;
    favorit: any =
    {
      createdOn :new Date,
      title: '',
      authorId: 0,
      recipeId: 0,
   };
    constructor(private recipeService: RecipeService, private profileService: ProfileService,
      private favouritrService:FavouriteService, private router: Router, private route: ActivatedRoute,
      private messageService: MessageService,
      ) {}


    ngOnInit() {
      this.profileService.getMe().subscribe({
        next: (res: any) => {
            this.userId = res?.data?.user?.id;
            this.favouritrService.getFavouritesUser(this.userId).subscribe((result: Favourite[]) =>{
            this.favouritedRecipes = result['data']
            console.log(this.favouritedRecipes);
            this.recipes.forEach(r => {
              const favourited = this.favouritedRecipes.find(fr => fr.recipeId === r.id);
              if (favourited) {
                r.favourited = true;
              } else {
                r.favourited = false;
              }
            });
          });

        }
        });
      this.route.params.subscribe((params) => {
        if (params['searchTerm']) {
          this.recipeService.searchRecipe(params['searchTerm'])
          .subscribe((result: Recipe[]) => this.recipes = result['data']);
        } else {
          this.recipeService.getRecipes()
          .subscribe((result: Recipe[]) => this.recipes = result['data']);
        }
      });

    }
    deleteFavourite(recipe:Recipe){
      var favourite = this.favouritedRecipes.find(fr => fr.recipeId === recipe.id);
      this.favouritrService.deleteFavourite(favourite.id).subscribe({
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
    }
    postFavourite(recipe:Recipe){
      console.log("called");
      console.log(recipe);
      this.favorit.title = "";
      this.favorit.createdOn = new Date();
      this.favorit.authorId = this.userId ;
      this.favorit.recipeId = recipe.id;

      console.log(this.favorit)
      this.favouritrService.postFavourite(this.favorit).subscribe({
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

    }
    searchIngredient() {
      this.recipeService.getIngredients().subscribe((result:Ingredient[]) => {
        this.filteredIngredient = result['data'].map(ingredient => ingredient.title);
      });
    }
    searchRecipes(name: string) {
      this.router.navigate(['search', { searchTerm: name }]);
    }

    addSearchTerm(searchTerm: string) {
        if (searchTerm !== '') {
          // Check if the string is already in the list.
          if (!this.searchTerms.includes(searchTerm)) {
            this.searchTerms.push(searchTerm);
            this.recipeService.searchMoreRecipe(this.searchTerms)
              .subscribe((result: Recipe[]) => this.recipes = result['data']);
          }
        } else if (this.searchTerms.length === 0) {
          this.recipeService.getRecipes()
            .subscribe((result: Recipe[]) => this.recipes = result['data']);
        }
      }

    deleteSearchTerm(searchTerm: string) {
        if(searchTerm!=""){
        const index = this.searchTerms.indexOf(searchTerm);
        if (index !== -1) {
          this.searchTerms.splice(index, 1);
        }
        if(this.searchTerms.length!=0){
        this.recipeService.searchMoreRecipe(this.searchTerms)
              .subscribe((result: Recipe[]) => this.recipes = result['data']);
        }else{
            this.recipeService.getRecipes()
                .subscribe((result:Recipe[]) => this.recipes = result['data']);
        }
        }
    }
    viewdetails(recipe:Recipe){
        this.recipeID = recipe.id;
        this.router.navigate(['recipe/',{ recipeId: this.recipeID }]);
    }

}

