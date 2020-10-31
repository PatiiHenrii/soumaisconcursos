import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from './sections/plans/plans.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { CadQuestionsComponent } from './questions/cad-questions/cad-questions.component';
import { AnoQuestionResolver, BancaQuestionResolver, DisciplinaQuestionResolver, InstituicaoQuestionResolver, NiveisQuestionResolver, QuestionsResolver } from './shared/providers/questions/data-question.resolve';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'plans', component: PlansComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'questions',
    component: QuestionsComponent,
    resolve: {
      questoes: QuestionsResolver,
      ano: AnoQuestionResolver, 
      banca: BancaQuestionResolver,
      inst: InstituicaoQuestionResolver, 
      disc: DisciplinaQuestionResolver
    }
  },
  {
    path: 'cad-questions',
    component: CadQuestionsComponent,
    resolve: { 
      questoes: QuestionsResolver, 
      ano: AnoQuestionResolver, 
      banca: BancaQuestionResolver,
      inst: InstituicaoQuestionResolver, 
      disc: DisciplinaQuestionResolver,
      nivel: NiveisQuestionResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }