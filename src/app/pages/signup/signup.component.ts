import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user = {
    nombre: '',
    password: '',
    email: '',
    numeroContacto: ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar){}

  ngOnInit():void{
  }

  formSubmit(){
  
   this.userService.agregarUsuario(this.user).subscribe( (dato) => {

    if(this.user.nombre == '' || this.user.password == '' || this.user.email == '' || this.user.numeroContacto == ''){
      return ;
    }
    console.log('Registro exitoso');
    Swal.fire('Usuario registrado', 'Usuario registrado con exito en el sistema', 'success');
    }, (error) => {
      console.error(error);
      this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
    );
  }

}
