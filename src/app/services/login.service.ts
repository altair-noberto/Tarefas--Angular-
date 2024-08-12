import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VariaveisGlobais } from "../../environments/environments";
import { Credenciais, CredenciaisCadastro, LoginResult } from "../models/login.model";

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    private _httpClient: HttpClient

    constructor(httpclient: HttpClient){
        this._httpClient = httpclient;
    }

    login(credenciais:Credenciais){
        return this._httpClient.post<LoginResult>(VariaveisGlobais.URL + 'Auth/login', credenciais)
    }

    cadastrar(credenciais:CredenciaisCadastro){
        return this._httpClient.post(VariaveisGlobais.URL + 'Auth/cadastro', credenciais);
    }

}