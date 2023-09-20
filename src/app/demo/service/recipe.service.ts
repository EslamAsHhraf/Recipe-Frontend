import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rating } from 'src/app/model/Rating';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    baseUrl = environment.baseUrl;
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }
    editRecipe(recipe, id) {
        return this.http.put(this.baseUrl + '/recipe/' + id, recipe, {
            withCredentials: true,
        });
    }
    addRecipe(recipe, imageFile) {
        return this.http.post(
            this.baseUrl +
                '/recipe?Title=' +
                recipe.title +
                '&Description=' +
                recipe.description +
                '&Steps=' +
                recipe.steps +
                '&Category=' +
                recipe.createdBy +
                '&CreatedBy=' +
                recipe.createdBy +
                '&ImageFile=' +
                recipe.imageFile,
            imageFile,
            {
                withCredentials: true,
            }
        );
    }
    getRecipes() {
        return this.http.get(this.baseUrl + '/recipe');
    }
    postRating(rating:Rating) {
        return this.http.post(this.baseUrl + '/rating', rating, {
            withCredentials: true,
        });
    }
    getRecipeRating(ratingid : number) {
        return this.http.get(this.baseUrl + '/rating?recipeid=' + ratingid );
    }
    getRecipebyid(recipeid: number) {
        return this.http.get(this.baseUrl + '/recipe/' + recipeid);
    }
    searchMoreRecipe(name: string[]) {
        return this.http.get(
            this.baseUrl +
                '/recipe/search?searchTerm=' +
                name.join('&searchTerm=')
        );
    }
    searchRecipe(name: string) {
        return this.http.get(
            this.baseUrl + '/recipe/search?searchTerm=' + name
        );
    }
    getIngredients() {
        return this.http.get(this.baseUrl + '/recipeingredients');
    }
    getMyRecipes() {
        return this.http.get(this.baseUrl + '/recipe/getMyRecipes', {
            withCredentials: true,
        });
    }
    deleteRecipe(recipeid: number) {
        return this.http.delete(this.baseUrl + '/recipe/' + recipeid, {
            withCredentials: true,
        });
    }
    updateImage(recipeId,image) {
        return this.http.put(
            this.baseUrl + '/recipe/updateImage/' + recipeId,
            image,
            {
                withCredentials: true,
            }
        );
    }

}
