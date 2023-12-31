import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RecipeIngredientsServices {
    baseUrl = environment.baseUrl;
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    addRecipeIngredients(data) {
        return this.http.post(this.baseUrl + '/recipeIngredient', data);
    }

    addListIngredients(data) {
        return this.http.post(
            this.baseUrl + '/recipeIngredient/listIngredients',
            data,
            {
                withCredentials: true,
            }
        );
    }

    deleteRecipeIngredients(id) {
        return this.http.delete(
            this.baseUrl + '/recipeIngredient/recipe/' + id,
            {
                withCredentials: true,
            }
        );
    }
}
