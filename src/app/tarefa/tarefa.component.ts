import { Component, Input } from '@angular/core';
import { Tarefa } from '../models/home.model';
import { HomeService } from '../services/home.service';
import { VariaveisGlobais } from '../../environments/environments';
import { Notificacao } from '../models/home.model';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent {
  @Input() tarefa?: Tarefa;

  ModoEditar:boolean = false;

  constructor(private homeService: HomeService){}

  notificacao:Notificacao = {
    NotificacaoCheck: false,
    NotificacaoMsg: "",
    Notificacao: false,
  }


  EditarId:number|undefined = -1;

  AtivarEdicao(id:number|undefined){
    this.ModoEditar = !this.ModoEditar;
    let btn = document.querySelector('#btn' + this.tarefa?.id);
    if(this.ModoEditar){
      btn?.classList.remove('fa-caret-right')
      btn?.classList.add('fa-caret-down')
    }else{
      btn?.classList.remove('fa-caret-down')
      btn?.classList.add('fa-caret-right')
    }
    return this.EditarId = id;
  }

  Abrir(){
    let desc = document.querySelector('#desc' + this.tarefa?.id);
    let btn = document.querySelector('#btn' + this.tarefa?.id);
    if(desc?.classList.contains('Aberto')){
        desc.classList.remove('Aberto')
        btn?.classList.remove('fa-caret-down')
        btn?.classList.add('fa-caret-right')
    }
    else {
        desc?.classList.add('Aberto')
        btn?.classList.remove('fa-caret-right')
        btn?.classList.add('fa-caret-down')
      }
    }
  }
