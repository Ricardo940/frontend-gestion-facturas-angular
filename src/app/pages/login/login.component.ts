import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    "email":'',
    "password":''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router){}

  ngOnInit():void{

  }

  formSubmit(){
    if(this.loginData.email.trim()=='' || this.loginData.password.trim()==''){
      this.snack.open('Email y password son requeridos!!','Aceptar',{
        duration:3000
      });
      return;
    }

    this.loginService.generarToken(this.loginData).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user)=>{
            console.log(user);
            this.loginService.setUser(user);
            if(this.loginService.getUserRole() == "admin"){
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(['admin']);
              
            }else if(this.loginService.getUserRole() == "user"){
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(['user-dashboard']);
              
            }else{
              this.loginService.logout();
            }
        },(error)=>console.log(error));
      },(error) => console.error(error)
    );

  }
}
