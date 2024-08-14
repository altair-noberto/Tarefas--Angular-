import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../models/home.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent {
  @Input() tarefa?: Tarefa;
  @Output() Remover = new EventEmitter();
  @Output() Atualizar = new EventEmitter<Tarefa>();


  AtualizarForm: FormGroup = new FormGroup({
    titulo: new FormControl(this.tarefa?.titulo),
    descricao: new FormControl(this.tarefa?.descricao)
  })

  ModoEditar:boolean = false;

  RemoverTarefa(id:number|undefined){
    this.Remover.emit(id);
  }

  AtualizarTarefa(){
    let id;
    if(this.tarefa?.id) id = this.tarefa.id
    else id = 0;

    let TarefaAtualizada = {
      id: id,
      titulo: this.AtualizarForm.value.titulo,
      descricao: this.AtualizarForm.value.descricao
    }

    this.Atualizar.emit(TarefaAtualizada)
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
    if(this.ModoEditar){
      this.AtivarEdicao(this.tarefa?.id)
    }
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
