import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../shared/models/usuario';
import { AuthenticatedService } from '../shared/providers/authenticated/authenticated.service';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus = true;
  focus1 = false;
  formUser: FormGroup;
  constructor(private fb: FormBuilder,
    private authe: AuthenticatedService) { }

  ngOnInit() {
    this.loginByFacebook();
    this.createFormUser(new Usuario());
  }

  private createFormUser(usuario: Usuario) {
    this.formUser = this.fb.group({
      codigo: [usuario.codigo],
      primeiro_nome: [usuario.primeiro_nome],
      segundo_nome: [usuario.segundo_nome],
      email: [usuario.email, [Validators.email, Validators.required]],
      endreco: [usuario.endreco],
      cidade: [usuario.cidade],
      pais: [usuario.pais],
      codigo_postal: [usuario.codigo_postal],
      data_inscricao: [usuario.data_inscricao],
      tipo_inscricao: [usuario.tipo_inscricao],
      dados_inscricao: [usuario.dados_inscricao],
      senha: [usuario.senha, Validators.required]
    });
  }

  private loginByFacebook() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '648974655750323',
        cookie: true,
        xfbml: true,
        version: 'v8.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  submitLoginFB() {    
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        console.log(response);
        FB.api(
          '/'+response.authResponse.userID,
          'GET',
          {"fields":"id,name,birthday,email"},
          function(response) {
            console.log(response)
            console.log('Good to see you, ' + response.name + '.');
          }
        );
      }
      else {
        console.log('User login failed');
      }
    });
  }

  submitLoginGoogle() {
  }

  submitForm() {
    const user = this.formUser.get('email').value;
    const pass = this.formUser.get('senha').value;
    this.authe.authenticatedUser(user, pass).subscribe(
      el => console.log(el)
    )
  }
}
