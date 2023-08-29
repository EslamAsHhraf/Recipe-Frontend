import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';

import { AlertifyService } from './services/alertify.service';
import { Register } from './Pages/register/register.component';
import { LogIn } from './Pages/logIn/logIn.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationService } from './services/Authentication/authentication.service';
import {  HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: Register },
  { path: 'login', component: LogIn },
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    Register,
    LogIn,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    DividerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AlertifyService,AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
