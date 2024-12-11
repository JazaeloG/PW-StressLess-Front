import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStateService } from 'src/app/servicios/global-service';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router : Router,  
    private fb: FormBuilder,
    private registroserv: RegistroService,
    private globalState: GlobalStateService) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario_Correo: ['', Validators.required],
      usuario_Password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
    console.log("Se presionó");
    
    if (this.loginForm.valid) {
      this.registroserv.loginUsuario(this.loginForm.value).subscribe(
        async (response: any) => {
          console.log('Login exitoso:', response);
  
          // Acceder al token correctamente y guardarlo en localStorage
          const accessToken = response?.access_token;
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            console.log('Token guardado en localStorage:', accessToken);
          } else {
            console.warn('El token no se encontró en la respuesta.');
          }
          this.globalState.correo = this.loginForm.value.usuario_Correo;
          console.log('Correo en globalState:', this.globalState.correo);
          this.router.navigate(['/home']);
        },
        async (error) => {
          console.error('Error en el login:', error);
        }
      );
    }
  }
  
  
}
