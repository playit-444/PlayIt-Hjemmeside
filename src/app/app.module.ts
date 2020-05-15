import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { FooterComponent } from './footer/footer.component';
=======
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckboxComponent } from './checkbox/checkbox.component';

>>>>>>> 56a4f438fe4671a8188f8260e01f06e3373514b0
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD
    FooterComponent
=======
    SignupFormComponent,
    CheckboxComponent
>>>>>>> 56a4f438fe4671a8188f8260e01f06e3373514b0
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
