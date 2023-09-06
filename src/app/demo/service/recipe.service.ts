import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    addRecipe(recipe) {
        return this.http.post(this.baseUrl + '/recipe', recipe);
    }
}
