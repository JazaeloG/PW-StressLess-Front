import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntasPage } from './preguntas.page';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { TestService } from 'src/app/servicios/test.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('PreguntasPage', () => {
  let component: PreguntasPage;
  let testService: jasmine.SpyObj<TestService>;
  let fixture: ComponentFixture<PreguntasPage>;
  let router: jasmine.SpyObj<Router>;

  beforeEach( async () => {
    const testServiceMock = jasmine.createSpyObj('TestService', ['crearTestResultado', 'getTests']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [ PreguntasPage ],
      imports: [ HttpClientTestingModule, FormsModule,IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerMock},
        { provide: TestService, useValue: testServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    testService = TestBed.inject(TestService) as jasmine.SpyObj<TestService>;
    fixture.detectChanges();

    component.answers = { 1: 3, 2: 4 };
    component.preguntas = [{ id: 1 }, { id: 2 }];
    component.test = { id_Test: 1 };
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });


  xit('should calculate score and navigate to results', () => {
    const localStorageSpy = spyOn(localStorage, 'getItem').and.returnValue('123');
    testService.crearTestResultado.and.returnValue(of({ success: true }));
  
    component.goToResults();
  
    expect(localStorageSpy).toHaveBeenCalledWith('id_Usuario');
    expect(testService.crearTestResultado).toHaveBeenCalledWith({
      usuarioId: '123',
      testId: 1,
      testResultado_Puntaje: 7,
      testResultado_Comentarios: 'Test realizado',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/resultados'], { state: { enviarPuntaje: 7 } });
  });
  
  

  xit('should set preguntas and test on successful getTests call', () => {
    const mockResponse = [
      {
        preguntas: [{ id: 1 }, { id: 2 }],
      },
    ];
    testService.getTests.and.returnValue(of(mockResponse));
  
    component.getTests();
  
    expect(component.preguntas).toEqual(mockResponse[0].preguntas);
    expect(component.test).toEqual(mockResponse[0]);
  });
  

  xit('should calculate the total score correctly', () => {
    const score = component.testPuntaje();
    expect(score).toBe(7); // Suma de 3 + 4
  });
  
  xit('should return true if form is complete', () => {
    component.answers = { 1: 3, 2: 4, 3:3, 4:1, 5:4, 6:4, 7:2, 8:4, 9:3, 10:2 }; // Dos respuestas
    component.preguntas = [{ id: 1 }, { id: 2 },{ id: 3 }, { id: 4 }, { id: 5 },{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 },{ id: 10 }]; // Dos preguntas
    expect(component.isFormComplete()).toBeTrue();
  });
  
  
});
