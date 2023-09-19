import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasedComponent } from './purchased.component';
import { PurchasedRoutingModule } from './purchased-routing.module';

@NgModule({
  imports: [
        CommonModule,
      PurchasedRoutingModule
  ],
  declarations: [PurchasedComponent]
})
export class PurchasedModule { }
