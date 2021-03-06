import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { SectionsModule } from './sections/sections.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuestionsComponent } from './questions/questions.component';
import { CadQuestionsComponent } from './questions/cad-questions/cad-questions.component';
import { HttpIntercepterService } from './shared/providers/http-intercepter/http-intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    QuestionsComponent,
    CadQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    SectionsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
