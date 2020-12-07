import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../shared/providers/login/login.service';
import { Usuario } from '../shared/models/usuario';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;

    formUser: FormGroup;
    constructor(private fb: FormBuilder, private _login: LoginService, private router: Router) { }

    ngOnInit() {
        this.formUser = this.fb.group({
            nome: ['', Validators.required],
            email: ['', Validators.required],
            senha: ['', Validators.required]
        });
    }

    submitUser() {
        console.log(this.formUser.value);
        let user = new Usuario();
        user.primeiro_nome = this.formUser.get('nome').value;
        user.email = this.formUser.get('email').value;
        user.senha = this.formUser.get('email').value;
        user.data_inscricao = new Date();
        this._login.createUser(user).subscribe(
            () => this.router.navigate(['login']),
            () => console.log("Erro")
        );
    }
}
