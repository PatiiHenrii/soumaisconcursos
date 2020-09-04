import { Component, OnInit } from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  constructor() { }

  ngOnInit() {
    this.loginByFacebook();
  }

  loginByFacebook() {
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
    console.log("submit login to facebook");
    // FB.login();
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
}
