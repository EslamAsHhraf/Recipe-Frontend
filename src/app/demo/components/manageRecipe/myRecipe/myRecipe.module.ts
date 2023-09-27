import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRecipeComponent } from './myRecipe.component';
import { ToolbarModule } from 'primeng/toolbar';
import { myRecipeRoutingModule } from './myRecipe-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
    imports: [
        CommonModule,
        myRecipeRoutingModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        RatingModule,
        PanelMenuModule,
        DataViewModule,
        FormsModule,
        PaginatorModule,
    ],
    declarations: [MyRecipeComponent],
})
export class MyRecipeModule {}
