import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyRecipeComponent } from './myRecipe.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: MyRecipeComponent }]),
    ],
    exports: [RouterModule],
})
export class myRecipeRoutingModule {}
