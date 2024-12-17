import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debería realizar una solicitud POST en crearTest', () => {
    const mockData = { nombre: 'Test 1', descripcion: 'Prueba de ejemplo' };
    const mockResponse = { id: 1, ...mockData };
    service.crearTest(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`http://localhost:3000/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockResponse);
  });

  it('debería realizar una solicitud GET en getTests', () => {
    const mockResponse = [
      { id: 1, nombre: 'Test 1', descripcion: 'Prueba 1' },
      { id: 2, nombre: 'Test 2', descripcion: 'Prueba 2' },
    ];
    service.getTests().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`http://localhost:3000/test`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería realizar una solicitud POST en crearTestResultado', () => {
    const mockData = { testId: 1, resultado: 'Aprobado' };
    const mockResponse = { id: 101, ...mockData };
    service.crearTestResultado(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`http://localhost:3000/test-resultado`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockResponse);
  });
});
