import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlanMeal } from 'src/app/model/PlanMeals';

@Injectable({
    providedIn: 'root',
})
export class PlanMealsService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getallUsersplanes(userid:number) {
        return this.http.post(this.baseUrl + '/PlanedMeals/User' ,  userid, {
            withCredentials: true,
        });
    }
    postPlan(plan:PlanMeal){
        return this.http.post(this.baseUrl + '/PlanedMeals' ,  plan, {
            withCredentials: true,
        });
    }
    updatePlan(plan:PlanMeal){
        return this.http.put(this.baseUrl + '/PlanedMeals' ,  plan, {
            withCredentials: true,
        });
    }
    deletePlan(plan:number){
        return this.http.delete(this.baseUrl + '/PlanedMeals?planid=' +  plan, {
            withCredentials: true,
        });
    }

}
