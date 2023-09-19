import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PurchasedComponent } from './purchased.component';
@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: PurchasedComponent }]),
    ],
    exports: [RouterModule],
})
export class PurchasedRoutingModule {}
