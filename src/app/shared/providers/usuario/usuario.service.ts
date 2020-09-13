import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  criarUsuario(usuario: Usuario) {
    console.log(usuario);
  }
}
