import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioTestPage } from './inicio-test.page';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InicioTestPage', () => {
  let component: InicioTestPage;
  let fixture: ComponentFixture<InicioTestPage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ InicioTestPage ],
      imports: [ HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock}
      ]
    });
    fixture = TestBed.createComponent(InicioTestPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should nav to preguntas', () => {
    component.navegarEncuesta();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/preguntas']);
  });
});
