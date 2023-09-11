import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recipeRoutingModule } from './recipe-routing.module';
import { recipeComponent } from './recipe.component';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    imports: [
        CommonModule,
        recipeRoutingModule,
		FormsModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		ConfirmDialogModule,
    ],
    declarations: [recipeComponent]
})
export class recipeModule { }
