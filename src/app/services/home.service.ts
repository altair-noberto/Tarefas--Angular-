import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VariaveisGlobais } from "../../environments/environments";
import { CriarTarefa, Tarefa } from "../models/home.model";

@Injectable({
    providedIn: 'root'
})

export class HomeService {

    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient
    }

    GetAllTarefas(Token:string){
        return this._httpClient.get<Array<Tarefa>>(VariaveisGlobais.URL + 'api/Tarefas',
            {
                headers: {"Authorization": `Bearer ${Token}`}
            });
    }

    CriarTarefa(Tarefa:CriarTarefa, Token:string){
        return this._httpClient.post<String>(VariaveisGlobais.URL + 'api/Tarefas', Tarefa,
            {
                headers: {"Authorization": `Bearer ${Token}`}
            });
    }

    RemoverTarefa(id:number, Token:string){
        return this._httpClient.delete<String>(VariaveisGlobais.URL + 'api/Tarefas/' + id, 
            {
                headers: {"Authorization": `Bearer ${Token}`}
            });
    }

    AtualizarTarefa(tarefa:Tarefa, Token:string){
        let titulo = tarefa.titulo;
        let descricao = tarefa.descricao
        return this._httpClient.put<String>(VariaveisGlobais.URL + 'api/Tarefas/' + tarefa.id, {titulo, descricao},
            {
                headers: {"Authorization": `Bearer ${Token}`},
            })
    }
}