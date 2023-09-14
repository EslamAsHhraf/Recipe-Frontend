import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddRecipeComponent } from './addRecipe.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: AddRecipeComponent }]),
    ],
    exports: [RouterModule],
})
export class AddRecipeRoutingModule {}
