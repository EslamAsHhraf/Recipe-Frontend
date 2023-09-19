import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ShoppingRoutingModule,
        ButtonModule,
        RippleModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        InputNumberModule,
        ToastModule,
        DropdownModule,
        InputTextModule,
        ToastModule,
        FormsModule
    ],
    declarations: [ShoppingComponent],
})
export class ShoppingModule {}
