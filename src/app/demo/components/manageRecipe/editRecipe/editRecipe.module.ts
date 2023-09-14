import { NgModule } from '@angular/core';
import { EditRecipeComponent } from './editRecipe.component';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';

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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EditRecipeRoutingModule } from './editRecipe-routing.module';
@NgModule({
    imports: [CommonModule,
        CommonModule,
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
        OverlayPanelModule,
        ChipsModule,
        EditRecipeRoutingModule],
    declarations: [EditRecipeComponent],
})
export class EditRecipeModule {}
