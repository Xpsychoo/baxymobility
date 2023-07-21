import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/basics/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { ErrorpageComponent } from './components/basics/errorpage/errorpage.component';
import { ConfirmboxComponent } from './components/basics/confirmbox/confirmbox.component';
import { LoadercardComponent } from './components/basics/loadercard/loadercard.component';
import { SidebarComponent } from './components/basics/sidebar/sidebar.component';
import { FooterComponent } from './components/basics/footer/footer.component';
import { NewuserscreenComponent } from './components/newUserScreens/newuserscreen/newuserscreen.component';
import { UserstableComponent } from './components/newUserScreens/userstable/userstable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SigninComponent,
    ErrorpageComponent,
    ConfirmboxComponent,
    LoadercardComponent,
    SidebarComponent,
    FooterComponent,
    NewuserscreenComponent,
    UserstableComponent,
  ],
  imports: [BrowserModule, NgbModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    HttpClientModule, CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
