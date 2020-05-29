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
import { TableSelectionComponent } from './modules/game-page/table-selection/table-selection.component';
import { LobbyComponent } from './modules/game-page/lobby/lobby.component';
import { TableComponent } from './modules/game-page/table-selection/table/table.component';
import { PlayerComponent } from './modules/game-page/lobby/player/player.component';
import { GameComponent } from './modules/game-page/game/game.component';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';
import { ErrorPageComponent } from './modules/main pages/error-page/error-page.component';

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
    TableSelectionComponent,
    LobbyComponent,
    TableComponent,
    PlayerComponent,
    GameComponent,
    ErrorPageComponent,
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
    CommonModule,
    FontAwesomeModule,
    CountdownModule,
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
