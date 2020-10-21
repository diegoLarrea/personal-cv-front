import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagesModule } from './_pages/pages.module';
import { DatePipe } from '@angular/common';
import { AuthInterceptorService } from 'src/_services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    JwtHelperService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
