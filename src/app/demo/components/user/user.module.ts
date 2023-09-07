import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
