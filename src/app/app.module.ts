import { GamesPageComponent } from './modules/main pages/games-page/games-page.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {CheckboxComponent} from './shared/modules/checkbox/checkbox.component';
import {SignupFormComponent} from './modules/signup-form/signup-form.component';
import {LoginFormComponent} from './modules/login-form/login-form.component';
import {GameCardComponent} from './modules/game-card/game-card.component';
import {HomePageComponent} from './modules/main pages/home-page/home-page.component';
import {CarouselComponent} from './shared/modules/carousel/carousel.component';
import {GamePageComponent} from './modules/game-page/game-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {AuthInterceptor} from './core/auth/auth.interceptor';
import {WebSocketService} from './shared/services/web-socket.service';
import { TermsComponent } from './modules/terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupFormComponent,
    CheckboxComponent,
    LoginFormComponent,
    GameCardComponent,
    HomePageComponent,
    CarouselComponent,
    GamePageComponent,
    TermsComponent,
    GamesPageComponent,
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
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  providers: [
    WebSocketService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
