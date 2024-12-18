import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
import { of, throwError } from 'rxjs';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let registroService: jasmine.SpyObj<RegistroService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const registroServiceSpy = jasmine.createSpyObj('RegistroService', ['loginUsuario']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule,IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    registroService = TestBed.inject(RegistroService) as jasmine.SpyObj<RegistroService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    //fixture.detectChanges();
  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize loginForm on ngOnInit', () => {
    component.ngOnInit();

    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['usuario_Correo']).toBeDefined();
    expect(component.loginForm.controls['usuario_Password']).toBeDefined();
  });

  it('should submit form and navigate on successful login', () => {
    const mockResponse = { access_token: 'mockToken123' };
    spyOn(localStorage, 'setItem');
    component.ngOnInit();

    // Configuramos el formulario válido
    component.loginForm.setValue({ usuario_Correo: 'test@correo.com', usuario_Password: '1234' });
    registroService.loginUsuario.and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(registroService.loginUsuario).toHaveBeenCalledWith({
      usuario_Correo: 'test@correo.com',
      usuario_Password: '1234',
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('correo', 'test@correo.com');
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'mockToken123');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error', () => {
    const mockError = new Error('Login error');
    spyOn(console, 'error');
    component.ngOnInit();

    component.loginForm.setValue({ usuario_Correo: 'test@correo.com', usuario_Password: '1234' });
    registroService.loginUsuario.and.returnValue(throwError(() => mockError));

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Error en el login:', mockError);
    expect(router.navigate).not.toHaveBeenCalled();
  });


});
