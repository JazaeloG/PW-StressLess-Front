import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InfoUsuarioService } from './info-usuario.service';
import { UserInfo } from './info-usuario.service';
import { of } from 'rxjs';


describe('InfoUsuarioService', () => {
  let service: InfoUsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InfoUsuarioService]
    });
    service = TestBed.inject(InfoUsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'correo') return 'test@test.com';
      return null;
    });
    spyOn(localStorage, 'setItem').and.stub();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  it('debería realizar una solicitud GET en getUserInfo y mapear la respuesta correctamente', () => {
    const mockResponse = {
      id_Usuario: 1,
      usuario_Nombre: 'Juan',
      usuario_Apellido: 'Pérez',
      usuario_Correo: 'test@test.com',
      usuario_Sexo: 'Masculino',
      usuario_FechaNacimiento: '2000-12-15'
    };

    const expectedUserInfo: UserInfo = {
      id: 1,
      nombre: 'Juan',
      apellidos: 'Pérez',
      email: 'test@test.com',
      sexo: 'Masculino',
      edad: 24,
      indiceEstres: 23.0
    };

    service.getUserInfo().subscribe((userInfo) => {
      expect(userInfo).toEqual(expectedUserInfo);
      expect(localStorage.setItem).toHaveBeenCalledWith('nombre', 'Juan');
    });

    const req = httpMock.expectOne(`http://localhost:3000/usuarios/obtenerPorCorreo/test@test.com`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería calcular correctamente la edad con calcularEdad', () => {
    jasmine.clock().install();
    const hoy = new Date('2024-12-14');
    jasmine.clock().mockDate(hoy);

    expect(service['calcularEdad']('2000-12-15')).toBe(23);
    expect(service['calcularEdad']('2000-12-14')).toBe(24);
    expect(service['calcularEdad']('2000-12-13')).toBe(24);

    jasmine.clock().uninstall();
  });
});
