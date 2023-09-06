import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  baseUrl = environment.baseUrl;
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
 }
  getIngredients(){
    return this.http.get(this.baseUrl +'/ingredients');
}
}
