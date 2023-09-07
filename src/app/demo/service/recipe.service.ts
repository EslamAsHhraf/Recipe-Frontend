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
     addRecipe(recipe) {
        return this.http.post(this.baseUrl + '/recipe', recipe);
    }
    getRecipes() {
        return this.http.get(this.baseUrl +'/recipe');
    }

    getRecipebyid(recipeid:number) {
        return this.http.get(this.baseUrl +'/recipe/' + recipeid);
    }

    searchRecipe(name:string){
        return this.http.get(this.baseUrl +'recipe/search/' + name);
    }

}
