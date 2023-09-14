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
                            path: 'addRecipe',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/addRecipe/addRecipe.module'
                                ).then((m) => m.AddRecipeModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
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
                                    './demo/components/editRecipe/editRecipe.module'
                                ).then((m) => m.EditRecipeModule),
                        },
                        {
                            path: 'myRecipe',
                            canActivate: [AuthGuardService],
                            loadChildren: () =>
                                import(
                                    './demo/components/myRecipe/myRecipe.module'
                                ).then((m) => m.MyRecipeModule),
                        },
                        {
                            path: 'ingredients',
                            loadChildren: () =>
                                import(
                                    './demo/components/ingredients/ingredients.module'
                                ).then((m) => m.ingredientsModule),
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
