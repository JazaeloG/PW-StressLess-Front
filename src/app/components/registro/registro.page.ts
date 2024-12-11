import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro.service'; 
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private registroService: RegistroService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      usuario_Nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      usuario_Apellido: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      usuario_Correo: ['', [Validators.required, Validators.email]],
      usuario_Sexo: ['', Validators.required],
      usuario_FechaNacimiento: ['', [Validators.required]],
      usuario_Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]]
    });
  }

  async onRegister() {
    if (this.registroForm && this.registroForm.valid) {
      const formValue = this.registroForm.value;
      const usuarioData = {
        usuario_Nombre: formValue.usuario_Nombre,
        usuario_Apellido: formValue.usuario_Apellido,
        usuario_Correo: formValue.usuario_Correo,
        usuario_Sexo: formValue.usuario_Sexo,
        usuario_FechaNacimiento: formValue.usuario_FechaNacimiento,
        usuario_Password: formValue.usuario_Password
      };

      this.registroService.registrarUsuario(usuarioData).subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Registro Exitoso',
            message: 'Tu registro ha sido completado con éxito.',
            buttons: ['OK']
          });
          await alert.present();
          alert.onDidDismiss().then(() => {
            this.router.navigate(['/home']); 
          });
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un problema con el registro. Intenta de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  get nombre() { return this.registroForm!.get('usuario_Nombre'); }
  get apellidos() { return this.registroForm!.get('usuario_Apellido'); }
  get correo() { return this.registroForm!.get('usuario_Correo'); }
  get sexo() { return this.registroForm!.get('usuario_Sexo'); }
  get fechaNacimiento() { return this.registroForm!.get('usuario_FechaNacimiento'); }
  get contrasena() { return this.registroForm!.get('usuario_Password'); }

}