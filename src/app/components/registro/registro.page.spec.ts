import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroService } from 'src/app/servicios/registro.service';
import { of, throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  /* let mockRegistroService: jasmine.SpyObj<RegistroService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;
  let mockRouter: jasmine.SpyObj<Router>; */

  const mockRegistroService = {
    registrarUsuario: jasmine.createSpy('registrarUsuario').and.returnValue({
      subscribe: jasmine.createSpy('subscribe'),
    }),
  };

  const mockAlertController = {
    create: jasmine.createSpy('create').and.returnValue({
      present: jasmine.createSpy('present'),
      onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve()),
    }),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockNavController = {
    navigateForward: jasmine.createSpy('navigateForward'),
    navigateBack: jasmine.createSpy('navigateBack'),
    navigateRoot: jasmine.createSpy('navigateRoot'),
  };

  beforeEach(async () => {
    /* mockRegistroService = jasmine.createSpyObj('RegistroService', ['registrarUsuario']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
 */
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, 
        FormsModule,
        IonicModule.forRoot()
      ],
      providers: [
        { provide: RegistroService, useValue: mockRegistroService },
        { provide: AlertController, useValue: mockAlertController },
        { provide: Router, useValue: mockRouter },
        { provide: NavController, useValue: mockNavController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario de registro', () => {
    expect(component.registroForm).toBeDefined();
    expect(component.registroForm!.controls['usuario_Nombre']).toBeDefined();
    expect(component.registroForm!.controls['usuario_Correo']).toBeDefined();
  });

  xit('debería llamar al servicio de registro', async () => {
    component.registroForm!.setValue({
      usuario_Nombre: 'Juan',
      usuario_Apellido: 'Pérez',
      usuario_Correo: 'juan@example.com',
      usuario_Sexo: 'MASCULINO',
      usuario_FechaNacimiento: '1990-01-01',
      usuario_Password: '12345678',
    });
    mockRegistroService.registrarUsuario.and.returnValue(of({}));
    const mockAlert = jasmine.createSpyObj('HTMLIonAlertElement', ['present', 'onDidDismiss']);
    mockAlert.onDidDismiss.and.returnValue(Promise.resolve());
    mockAlertController.create.and.returnValue(Promise.resolve(mockAlert));

    component.onRegister();

    expect(mockRegistroService.registrarUsuario).toHaveBeenCalledWith({
      usuario_Nombre: 'Juan',
      usuario_Apellido: 'Pérez',
      usuario_Correo: 'juan@example.com',
      usuario_Sexo: 'Masculino',
      usuario_FechaNacimiento: '1990-01-01',
      usuario_Password: '12345678',
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('debería devolver los controles del formulario correctamente', () => {
    expect(component.nombre).toBe(component.registroForm!.get('usuario_Nombre'));
    expect(component.apellidos).toBe(component.registroForm!.get('usuario_Apellido'));
    expect(component.correo).toBe(component.registroForm!.get('usuario_Correo'));
  });
});
