import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DividerModule} from 'primeng/divider';

import { Register } from './Pages/register/register.component';
import { LogIn } from './Pages/logIn/logIn.component';
import { LoginComponent } from './components/login/login.component';
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: Register },
  { path: 'login', component: LogIn },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogIn,
    LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    DividerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
