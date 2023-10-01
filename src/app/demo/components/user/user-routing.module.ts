import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
        { path: 'profile/:id', loadChildren: () => import('./otherProfile/otherProfile-routing.module').then(m => m.OtherProfileRoutingModule) },
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }
