import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        RouterModule,
        CardModule,
        DialogModule,
        TableModule,
        FileUploadModule,
        RippleModule,
        InputNumberModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        TabViewModule,
        OverlayPanelModule
    ],
    declarations: [ProfileComponent,AddRecipeComponent,ChangePasswordComponent],
})
export class ProfileModule {}
