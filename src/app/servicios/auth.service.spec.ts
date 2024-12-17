import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debería realizar una solicitud POST en login y guardar el correo en localStorage', () => {
    const mockCredentials = { correo: 'test@test.com', contrasena: '123456' };
    const mockResponse = { token: 'mockToken' };
    service.login(mockCredentials).subscribe((response) => {
      expect(response).toEqual(mockResponse);

      const storedCorreo = localStorage.getItem('correo');
      expect(storedCorreo).toBe(mockCredentials.correo);
    });
    const req = httpMock.expectOne(`http://localhost:3000/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      usuario_Correo: mockCredentials.correo,
      usuario_Password: mockCredentials.contrasena,
    });
    req.flush(mockResponse);
  });
});
