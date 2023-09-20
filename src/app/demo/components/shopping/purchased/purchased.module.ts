import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedComponent } from './purchased.component';
import { PurchasedRoutingModule } from './purchased-routing.module';
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
import { ChipsModule } from 'primeng/chips';
import { OverlayModule } from 'primeng/overlay';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    imports: [
        CommonModule,
        PurchasedRoutingModule,
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
        FormsModule,
        OverlayModule,
        TabViewModule,
        ChipsModule,
    ],
    declarations: [PurchasedComponent],
})
export class PurchasedModule {}
