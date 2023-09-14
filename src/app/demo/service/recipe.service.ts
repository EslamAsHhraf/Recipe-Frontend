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
        return this.http.put(this.baseUrl + '/recipe/' + id, recipe);
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
                recipe.createdBy,
            imageFile,
            {
                withCredentials: true,
            }
        );
    }
    
    postRating(rating:Rating) {
        return this.http.post(this.baseUrl + '/rating' , rating);
    }
    getRecipeRating(ratingid : number) {
        return this.http.get(this.baseUrl + '/rating/' + ratingid );
    }
 
    getRecipes() {
        return this.http.get(this.baseUrl + '/recipe');
    }

    getRecipebyid(recipeid: number) {
        return this.http.get(this.baseUrl + '/recipe/' + recipeid);
    }
    searchMoreRecipe(name: string[]) {
        return this.http.get(this.baseUrl + '/recipe/search?searchTerm=' + name.join('&searchTerm='));
    }
    searchRecipe(name: string) {
        return this.http.get(this.baseUrl + '/recipe/search?searchTerm=' + name);
    }
    getIngredients() {
        return this.http.get(this.baseUrl + '/recipeingredients');
    }
    getMyRecipes() {
        return this.http.get(this.baseUrl + '/recipe/getMyRecipes',{withCredentials:true});
    }
    deleteRecipe(recipeid: number){
        return this.http.delete(this.baseUrl + '/recipe/' + recipeid ,{withCredentials:true});
    }
}
