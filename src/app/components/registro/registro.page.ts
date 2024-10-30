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
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]]
    });
  }

  async onRegister() {
    if (this.registroForm && this.registroForm.valid) {
      this.registroService.registrarUsuario(this.registroForm.value).subscribe(
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

  get nombre() { return this.registroForm!.get('nombre'); }
  get apellidos() { return this.registroForm!.get('apellidos'); }
  get correo() { return this.registroForm!.get('correo'); }
  get sexo() { return this.registroForm!.get('sexo'); }
  get edad() { return this.registroForm!.get('edad'); }
  get contrasena() { return this.registroForm!.get('contrasena'); }
}