import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtherProfileComponent } from './otherProfile.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: OtherProfileComponent }]),
    ],
    exports: [RouterModule],
})
export class OtherProfileRoutingModule {}
