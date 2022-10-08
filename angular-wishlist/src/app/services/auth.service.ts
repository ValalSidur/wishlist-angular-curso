import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user:string, password: string): boolean{
    if(user === 'user' && password === 'password'){
      localStorage.setItem('userName', user);
      return true;
    }
    return false;
  }

  logout(): any{
    localStorage.removeItem('userName');
  }

  getUser(): any {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean{
    return this.getUser() !== null
  }
}
