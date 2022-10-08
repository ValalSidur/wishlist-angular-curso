import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;
  constructor(public authService: AuthService) { 
    this.mensajeError = '';
  }

  ngOnInit(): void {
  }

  login(userName: string, password: string): boolean{
    this.mensajeError = '';
    if(!this.authService.login(userName, password)){
      this.mensajeError = "Login incorrecto";
      setTimeout(() => {
        this.mensajeError = '';
      }, 2500);
    }
    return false;
  }

  logout(): boolean{
    this.authService.logout();
    return false;
  }

}
