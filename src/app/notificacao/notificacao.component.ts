import { Component, Input } from '@angular/core';
import { Notificacao } from '../models/home.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.css'
})
export class NotificacaoComponent {
@Input() NotificarObj?: Notificacao ;

}
