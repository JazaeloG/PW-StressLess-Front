import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResultadosPage } from './resultados.page';

describe('ResultadosPage', () => {
  let component: ResultadosPage;
  let fixture: ComponentFixture<ResultadosPage>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ResultadosPage],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
    spyOnProperty(history, 'state', 'get').and.returnValue({
      enviarPuntaje: { puntaje: 85 },
    });
    fixture = TestBed.createComponent(ResultadosPage);
    component = fixture.componentInstance;
  });


  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar testResult desde history.state.enviarPuntaje', () => {
    component.ngOnInit();
    expect(component.testResult).toEqual({ puntaje: 85 });
  });

  it('debería navegar a "/info-usuario" al llamar a navegarResultados', () => {
    component.navegarResultados();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/info-usuario']);
  });
});
