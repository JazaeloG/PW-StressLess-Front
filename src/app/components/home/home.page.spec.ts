import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { RecomendacionesService } from 'src/app/servicios/recomendaciones.service';
import { Router } from '@angular/router';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Platform } from '@ionic/angular';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { exercise } from 'src/app/shared/interfaces/ejercicio.interface';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let platformSpy: jasmine.SpyObj<Platform>;
  let dataTransportService: jasmine.SpyObj<RecomendacionesService>;

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    let platformSpy = jasmine.createSpyObj('Platform', ['width']);
    const dataTransportServiceSpy = jasmine.createSpyObj('RecomendacionesService', ['setData', 'getData']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [FormsModule,IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Platform, useValue: platformSpy},
        { provide: RecomendacionesService, useValue: dataTransportServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    platformSpy= TestBed.inject(Platform) as jasmine.SpyObj<Platform>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dataTransportService = TestBed.inject(RecomendacionesService) as jasmine.SpyObj<RecomendacionesService>;
    //fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data correctly on ngOnInit', () => {
    const mockRetos = [{ 
      id_Recomendacion: 4,
        recomendacion_Nombre: "Relajación",
        recomendacion_Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_Detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_NivelRecomendacion: 26,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ghlNdBgA-zn73g9mhtpGWs31Xc1atO-Ihw&s"
     }];
    dataTransportService.retosExtraidos = mockRetos;
    dataTransportService.getData.and.returnValue(mockRetos);
    const consoleLogSpy = spyOn(console, 'log');
    component.ngOnInit();
    expect(dataTransportService.setData).toHaveBeenCalledWith(mockRetos);
    expect(dataTransportService.getData).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith("ngOnInit Inicializado");
    expect(consoleLogSpy).toHaveBeenCalledWith(mockRetos);
    expect(component.retos).toEqual(mockRetos);
  });

  xit('should assign descripcion and toggle elementoVisible when screen width is <= 550', () => {
    platformSpy.width.and.returnValue(550);
    const texto = 'Texto de descripción';
    component.abrirDescripcion(texto);
    expect(component.descripcion).toBe(texto);
    expect(component.elementoVisible).toBe(true);
  });

  it('debería navegar a ejercicios', () => {
    const consoleSpy = spyOn(console, 'log');
    const mockData = { 
      id_Recomendacion: 4,
        recomendacion_Nombre: "Relajación",
        recomendacion_Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_Detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_NivelRecomendacion: 26,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ghlNdBgA-zn73g9mhtpGWs31Xc1atO-Ihw&s"
    };
    component.sendData(mockData);
    expect(consoleSpy).toHaveBeenCalledWith('Datos enviados:', mockData);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/exercise', mockData.id_Recomendacion]);
  });

  it('debería navegar al test', () => {
    component.navigateToTest();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio-test']);
  });
});
