import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    baseUrl = environment.baseUrl;
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getRecipes() {
        return this.http.get(this.baseUrl +'/recipe');
    }

    getRecipebyid(recipeid:number) {
        return this.http.get(this.baseUrl +'/recipe/' + recipeid);
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
}
