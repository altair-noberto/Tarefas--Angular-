import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Credenciais, CredenciaisCadastro } from '../models/login.model';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private loginService:LoginService) { }
  
  CadastroForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    confirmaSenha: new FormControl('')
  })

  LoginForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  })

  mensagemcadastro:string = '';
  mensagemlogin:string = '';
  mensagemsucesso:boolean = false;

  desabilitarbutton:boolean = true
  validminuscula:boolean = false
  validmaiuscula:boolean = false
  validtamanho:boolean = false
  validsimbolo:boolean = false
  validnumero:boolean = false
  confirmsenha:boolean = false
  
  VerificarSenha(){
    const minuscula:RegExp = /(?=.*[a-z])/;
    const maiuscula:RegExp = /(?=.*[A-Z])/;
    const tamanho:RegExp = /^.{6,16}$/;
    const simbolo:RegExp = /[$*&@#%]/;
    const numero:RegExp = /[0-9]/;

    if(this.CadastroForm.value.senha){
      this.validminuscula = minuscula.test(this.CadastroForm.value.senha)
      this.validmaiuscula = maiuscula.test(this.CadastroForm.value.senha)
      this.validtamanho = tamanho.test(this.CadastroForm.value.senha)
      this.validsimbolo = simbolo.test(this.CadastroForm.value.senha)
      this.validnumero = numero.test(this.CadastroForm.value.senha)
    };
    this.CadastroForm.value.senha === this.CadastroForm.value.confirmaSenha ?
    this.confirmsenha = true : this.confirmsenha = false;

    if(this.validmaiuscula && this.validminuscula && this.validnumero
      && this.validsimbolo && this.validtamanho && this.confirmsenha
     ) this.desabilitarbutton = false;
     else this.desabilitarbutton = true;
}
  
async Cadastrar(){
  let credenciais:CredenciaisCadastro = {
    nome: this.CadastroForm.value.nome? this.CadastroForm.value.nome : '',
    email: this.CadastroForm.value.email? this.CadastroForm.value.email : '',
    senha: this.CadastroForm.value.senha? this.CadastroForm.value.senha : ''
  }

  this.loginService.cadastrar(credenciais).subscribe(result => {
  },
    error => {
      if(error.status === 200){
        this.mensagemsucesso = true;
        this.mensagemcadastro = "Usuário cadastrado com sucesso! redirecionando..."
        setTimeout(() => {
          this.CadastroForm.reset();
          this.validmaiuscula = false;
          this.validminuscula = false;
          this.validnumero = false;
          this.validsimbolo = false;
          this.validtamanho = false;
          this.desabilitarbutton = true;
          this.confirmsenha = false;
          this.AlterarPagina();
        }, 2000);
        return;
      }
      if(error.status === 400){
        this.mensagemsucesso = false;
        this.mensagemcadastro ="Email já cadastrado.";
      }
      else {
        this.mensagemsucesso = false;
        this.mensagemcadastro ="Falha ao cadastrar";
        console.log(error);
      }
      return;
    }
)
}

Login(){
  let credenciais:Credenciais = {
    email: this.LoginForm.value.email? this.LoginForm.value.email : '',
    senha: this.LoginForm.value.senha? this.LoginForm.value.senha : ''
  }
  
  this.loginService.login(credenciais).subscribe(result => {
      this.mensagemsucesso = true;
      this.mensagemlogin = 'Login realizado com sucesso!';
      document.cookie = `token=${result.token}`;
      localStorage.setItem('Nome', result.nome);
      this.LoginForm.reset();
      this.router.navigate(['/']);
  },
    error => {
      this.mensagemsucesso = false;
      this.mensagemlogin = 'Usuário ou senha inválidos.';
      console.log(error)
    }
  );
}
  
  Cadastro:boolean = false;

  AlterarPagina(){
    this.mensagemcadastro = ''
    this.Cadastro = !this.Cadastro;
  }
}
