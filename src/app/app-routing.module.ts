import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuardService } from './demo/service/authGuardService.service';
import { AccessComponent } from './demo/components/auth/access/access.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'search',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'myFavorite',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'addRecipe',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/manageRecipe/addRecipe/addRecipe.module'
                                ).then((m) => m.AddRecipeModule),
                        },
                        {
                            path: 'user',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/user/user.module'
                                ).then((m) => m.UserModule),
                        },
                        {
                            path: 'recipe',
                            loadChildren: () =>
                                import(
                                    './demo/components/recipe/recipe.module'
                                ).then((m) => m.recipeModule),
                        },
                        {
                            path: 'editRecipe',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/manageRecipe/editRecipe/editRecipe.module'
                                ).then((m) => m.EditRecipeModule),
                        },
                        {
                            path: 'myRecipe',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/manageRecipe/myRecipe/myRecipe.module'
                                ).then((m) => m.MyRecipeModule),
                        },
                        {
                            path: 'shopping',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/shopping/shopping.module'
                                ).then((m) => m.ShoppingModule),
                        },
                        {
                            path: 'eventcalendar',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/eventCalendar/eventcalendar.module'
                                ).then((m) => m.EventCalendarModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: 'access', component: AccessComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
