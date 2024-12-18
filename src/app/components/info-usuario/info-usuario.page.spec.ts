import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoUsuarioPage } from './info-usuario.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { InfoUsuarioService, UserInfo } from 'src/app/servicios/info-usuario.service';

describe('InfoUsuarioPage', () => {
  let component: InfoUsuarioPage;
  let fixture: ComponentFixture<InfoUsuarioPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let infoUsuarioService: jasmine.SpyObj<InfoUsuarioService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    //const infoUsuarioServiceSpy = jasmine.createSpyObj('InfoUsuarioService', ['getUserInfo']);

    TestBed.configureTestingModule({
      declarations: [ InfoUsuarioPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock},
        //{ provide: InfoUsuarioService, useValue: infoUsuarioServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(InfoUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    infoUsuarioService = TestBed.inject(InfoUsuarioService) as jasmine.SpyObj<InfoUsuarioService>;
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly ngOnInit', async () => {
    // Simular el valor almacenado en localStorage
    spyOn(localStorage, 'getItem').and.returnValue('juan@ejemplo.com');
    
    // Simular el método getUserInfo para devolver un observable
    spyOn(infoUsuarioService, 'getUserInfo').and.returnValue(of({ 
      id: 1,
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@ejemplo.com',
      sexo: 'Masculino',
      edad: 24,
      indiceEstres: 23.0
    }));
    
    // Espía en console.log
    const consoleLogSpy = spyOn(console, 'log');
  
    // Llamar a ngOnInit
    await component.ngOnInit();
  
    // Verificar que se llamó a getUserInfo
    expect(infoUsuarioService.getUserInfo).toHaveBeenCalled();
  
    // Verificar que console.log se llamó con los mensajes correctos
    expect(consoleLogSpy).toHaveBeenCalledWith('InfoUsuarioPage ngOnInit');
    expect(consoleLogSpy).toHaveBeenCalledWith('Correo en globalState:', 'juan@ejemplo.com');
  });
  

  it('should nav to login', () => {
    component.cerrarSesion();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
