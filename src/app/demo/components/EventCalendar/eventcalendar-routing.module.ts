import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventcalendarComponent } from './eventcalendar.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EventcalendarComponent }
    ])],
    exports: [RouterModule]
})
export class EventcalendarRoutingModule { }
