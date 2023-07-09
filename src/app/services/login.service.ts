import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpCliente:HttpClient) { }

  public generarToken(loginData:any){
    return this.httpCliente.post(`${baseUrl}/user/login`,loginData);
  }

  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let user = localStorage.getItem('user');
    if(user != undefined && user != '' && user != null){
      return JSON.parse(user);
    }
    this.logout();
    return null;
  }

  public getUserRole(){
    let user = this.getUser();
    return user.role;
  }

  public getCurrentUser(){
    return this.httpCliente.get(`${baseUrl}/user/user-actual`);
  }

}
