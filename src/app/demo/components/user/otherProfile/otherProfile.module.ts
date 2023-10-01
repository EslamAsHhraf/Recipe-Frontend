import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherProfileComponent } from './otherProfile.component';
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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
    imports: [
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
        PaginatorModule
    ],
    declarations: [OtherProfileComponent],
})
export class OtherProfileModule {}
