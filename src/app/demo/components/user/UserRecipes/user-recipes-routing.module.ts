import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRecipesComponent } from './user-recipes.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: UserRecipesComponent }]),
    ],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
