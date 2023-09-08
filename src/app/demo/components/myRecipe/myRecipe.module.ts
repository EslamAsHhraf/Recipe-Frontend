import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRecipeComponent } from './myRecipe.component';
import { ToolbarModule } from 'primeng/toolbar';
import { myRecipeRoutingModule } from './myRecipe-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@NgModule({
    imports: [
        CommonModule,
        myRecipeRoutingModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
    ],
    declarations: [MyRecipeComponent],
})
export class MyRecipeModule {}
