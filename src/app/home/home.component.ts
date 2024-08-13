import { Component, OnInit } from '@angular/core';
import { VariaveisGlobais } from '../../environments/environments';
import {Router} from "@angular/router"
import { HomeService } from '../services/home.service';
import { Tarefa, CriarTarefa, Notificacao } from '../models/home.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TarefaComponent } from '../tarefa/tarefa.component';
import { NotificacaoComponent } from '../notificacao/notificacao.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TarefaComponent, NotificacaoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  ModoCriar:boolean = false;

  AtivarModoCriar(){
    this.ModoCriar = !this.ModoCriar
  }

  FormCriar = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl('')
  })

  Busca:string = '';

  Paginas:number = 1;

  PaginaAtual:number = 1;

  ListPaginas:number[] = [];

  ListaTarefas:Tarefa[] = [];

  ExibirTarefa:Tarefa[] = [];

  notificacao:Notificacao = {
    NotificacaoCheck: false,
    NotificacaoMsg: "",
    Notificacao: false,
  }

  NomeUsuario:string|undefined = localStorage.getItem('Nome')?.split(' ')[0];

  constructor(private router: Router, private homeService:HomeService) { }

  async ngOnInit() {

      VariaveisGlobais.Token = document.cookie.split('token=')[1]
      let result;

      await fetch(VariaveisGlobais.URL + "Auth", {
          method: "GET",
          headers: {"Authorization": `Bearer ${VariaveisGlobais.Token}`}
      }).then((r) => result = r.status);
              
      if(result === 200){
          this.ObterTarefas()
          return
      }
      this.router.navigate(['/login'])
  }

  Logout(){
    document.cookie = 'token' + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    this.router.navigate(['/login'])
  }

  ObterTarefas(){
    this.homeService.GetAllTarefas(VariaveisGlobais.Token).subscribe(result => {
      this.ListaTarefas = result;
      this.ListaTarefas = this.ListaTarefas.sort(function(a, b){
        return b.id - a.id
      })
      this.Paginas = Math.ceil(this.ListaTarefas.length / 10);
      this.CarregarTarrefas(this.PaginaAtual);
    });
  }

  ListarPaginacao(Pagina:number){
    this.ListPaginas = [];
    this.PaginaAtual = Pagina;
    let pagsNum:number;
    let primeiraPag:number;
    if(this.Paginas >= 10){
      if(Pagina > 3){
        if(this.PaginaAtual + 7 > this.Paginas) {
          pagsNum = this.Paginas
          primeiraPag = pagsNum - 10;
        }
        else{
          pagsNum = this.PaginaAtual + 7;
          primeiraPag = Pagina - 2;
        } 
        for(let i = primeiraPag; i <= pagsNum; i++){
          this.ListPaginas.push(i);
        }
      }
      else{
        for(let i = 1; i <= 10; i++){
          this.ListPaginas.push(i);
        }
      }
    }
    else{
      for(let i = 1; i <= this.Paginas; i++){
        this.ListPaginas.push(i);
      }
    }
  }

  Notificar(mensagem:string, valid:boolean){
    this.notificacao.NotificacaoMsg = mensagem;
    this.notificacao.NotificacaoCheck = valid;
    this.notificacao.Notificacao = true;
    setTimeout(() => this.notificacao.Notificacao = false, 4000);
  }

  CarregarTarrefas(Pagina:number){

    this.ListarPaginacao(Pagina);

    this.ExibirTarefa = [];

    let TarefasFinal = Pagina * 10;

    let TarefasInicial:number = TarefasFinal - 10;

    this.PaginaAtual = Pagina;
        
    for(let i = TarefasInicial; i < TarefasFinal; i++){
      if(!this.ListaTarefas[i]){
        break;
      }
      this.ExibirTarefa.push(this.ListaTarefas[i]);
    }
  }

  CarregarTarefasBusca(busca:string){
    if(busca === '') {
      this.CarregarTarrefas(this.PaginaAtual)
      return
    };

    this.ExibirTarefa = [];

    this.ExibirTarefa = this.ListaTarefas.filter(function(t) {
      if(t.titulo.toUpperCase().includes(busca.toUpperCase()) ||
        t.descricao.toUpperCase().includes(busca.toUpperCase())) return t;
        else return;
    })
  }

  CriarTarefa(){
    let tarefa:CriarTarefa = {
      titulo: this.FormCriar.value.titulo,
      descricao: this.FormCriar.value.descricao
    }

    this.homeService.CriarTarefa(tarefa, VariaveisGlobais.Token).subscribe(result => {
      
    }, error => {
      if(error.status === 200){
        this.ObterTarefas();
        this.FormCriar.reset();
        this.Notificar('Tarefa criada com sucesso!', true)
      }
      else{
        this.Notificar('Não foi possível criar a tarefa', false)
      }
    })
  }

  RemoverTarefa(id:number){
    this.homeService.RemoverTarefa(id, VariaveisGlobais.Token).subscribe(result => {
      
    }, error => {
      if(error.status === 200){
        this.Notificar('Tarefa removida com sucesso!', true)
        this.ObterTarefas();
        return;
      }
      this.Notificar('Não foi possível remover a tarefa', false)
      })
  }
}
