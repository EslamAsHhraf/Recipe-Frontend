import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { recipeComponent } from './recipe.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: recipeComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class recipeRoutingModule {}
