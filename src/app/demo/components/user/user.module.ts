import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { OtherProfileModule } from './otherProfile/otherProfile.module';

@NgModule({
    imports: [CommonModule, UserRoutingModule,OtherProfileModule],
})
export class UserModule {}
