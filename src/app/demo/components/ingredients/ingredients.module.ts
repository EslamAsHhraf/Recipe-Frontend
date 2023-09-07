import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ingredientsRoutingModule } from './ingredients-routing.module';
import { ingredientsComponent } from './ingredients.component';

@NgModule({
    imports: [
        CommonModule,
        ingredientsRoutingModule
    ],
    declarations: [ingredientsComponent]
})
export class ingredientsModule { }
