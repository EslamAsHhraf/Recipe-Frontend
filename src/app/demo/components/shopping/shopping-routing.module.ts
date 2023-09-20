import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'purchased',
                loadChildren: () =>
                    import('./purchased/purchased.module').then(
                        (m) => m.PurchasedModule
                    ),
            },
            {
                path: '',
                loadChildren: () =>
                    import('./shopping/shopping.module').then(
                        (m) => m.ShoppingModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ShoppingRoutingModule {}
