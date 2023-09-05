import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipeRoutingModule } from './recipe-routing.module';
import { recipeComponent } from './recipe.component';

@NgModule({
    imports: [
        CommonModule,
        recipeRoutingModule
    ],
    declarations: [recipeComponent]
})
export class recipeModule { }
