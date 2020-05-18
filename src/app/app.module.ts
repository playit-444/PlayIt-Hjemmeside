import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckboxComponent } from './checkbox/checkbox.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import { LoginFormComponent } from './login-form/login-form.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TableSelectionComponent } from './table-selection/table-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupFormComponent,
    CheckboxComponent,
    LoginFormComponent,
    GameSelectionComponent,
    HomePageComponent,
    TableSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
