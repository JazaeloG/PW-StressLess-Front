import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  let service: RegistroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroService]
    });
    service = TestBed.inject(RegistroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST para loginUsuario', () => {
    const mockData = { username: 'test', password: '1234' };
    const mockResponse = { token: 'fake-jwt-token' };

    service.loginUsuario(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockResponse); // Simula la respuesta del servidor
  });

  it('debería enviar una solicitud POST para registrarUsuario', () => {
    const mockData = { username: 'newuser', password: '12345', email: 'test@test.com' };
    const mockResponse = { message: 'Usuario registrado con éxito' };

    service.registrarUsuario(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/auth/registrar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);

    req.flush(mockResponse); // Simula la respuesta del servidor
  });
});
