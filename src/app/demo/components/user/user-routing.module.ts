import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }
