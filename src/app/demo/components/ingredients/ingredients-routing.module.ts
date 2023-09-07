import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ingredientsComponent } from './ingredients.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ingredientsComponent }
    ])],
    exports: [RouterModule]
})
export class ingredientsRoutingModule { }
