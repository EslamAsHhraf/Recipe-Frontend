import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Favourite } from 'src/app/model/Favourite';

@Injectable({
    providedIn: 'root',
})
export class FavouriteService {
    baseUrl = environment.baseUrl;
    private readonly http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }
    postFavourite(fav: Favourite) {
        return this.http.post(this.baseUrl + '/Favourite/', fav, {
            withCredentials: true,
        });
    }
    getFavouritesUser(userid:number) {
        return this.http.post(this.baseUrl + '/Favourite/Favouritesofuser' , userid  ,{
            withCredentials: true,
        });
    }
    deleteFavourite(id:number) {
        return this.http.delete(this.baseUrl + '/Favourite?id=' + id, {
            withCredentials: true,
        });
    }
    getFavouritesRecipes(userid:number) {
        return this.http.post(this.baseUrl + '/Favourite/FavouritesRecipes' , userid  ,{
            withCredentials: true,
        });
    }

}
