import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditRecipeComponent } from './editRecipe.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: EditRecipeComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class EditRecipeRoutingModule {}
