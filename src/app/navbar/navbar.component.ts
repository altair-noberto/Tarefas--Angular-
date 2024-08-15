import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
@Input() Login:boolean = true;

  constructor(private router: Router) { }

  Dark:boolean = false;

  Logout(){
    document.cookie = 'token' + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    this.router.navigate(['/login'])
  }

  DarkLight(){
    const body = document.body
    if(this.Dark){
      body.classList.remove('dark');
      this.Dark = false
      localStorage.setItem('Dark', 'false');
    }
    else{
      body.classList.add('dark');
      this.Dark = true
      localStorage.setItem('Dark', 'true');
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('Dark') === 'true'){
      this.DarkLight();
    }
  }
}
