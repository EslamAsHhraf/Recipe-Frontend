import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ShoppingService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}
    getShopping() {
        return this.http.get(this.baseUrl + '/shopping/getShopping', {
            withCredentials: true,
        });
    }
    deleteProduct(id) {
        return this.http.delete(this.baseUrl + '/shopping/' + id, {
            withCredentials: true,
        });
    }
    addPurchased(id, quantity) {
        return this.http.post(this.baseUrl + '/shopping/addPurchased?id=+'+id+'&quantity='+quantity,null ,{
            withCredentials: true,
        });
    }
}
