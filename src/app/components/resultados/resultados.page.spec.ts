import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadosPage } from './resultados.page';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ResultadosPage', () => {
  let component: ResultadosPage;
  let fixture: ComponentFixture<ResultadosPage>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ ResultadosPage ],
      imports: [ HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock}
      ]
    });
    fixture = TestBed.createComponent(ResultadosPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should nav to info', () => {
    component.navegarResultados();
    expect(router.navigate).toHaveBeenCalledWith(['/info-usuario']);
  });
});
