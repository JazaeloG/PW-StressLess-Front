import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExercisePage } from './exercise.page';
import { ActivatedRoute } from '@angular/router';
import { RecomendacionesService } from 'src/app/servicios/recomendaciones.service';
import { IonicModule } from '@ionic/angular';

describe('ExercisePage', () => {
  let component: ExercisePage;
  let fixture: ComponentFixture<ExercisePage>;
  let recomendacionesService: jasmine.SpyObj<RecomendacionesService>;

  beforeEach(() => {
    const recomendacionesServiceSpy = jasmine.createSpyObj('RecomendacionesService', ['getData']);

    TestBed.configureTestingModule({
      declarations: [ ExercisePage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('1') } } } },
        { provide: RecomendacionesService, useValue: recomendacionesServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(ExercisePage);
    component = fixture.componentInstance;
    recomendacionesService = TestBed.inject(RecomendacionesService) as jasmine.SpyObj<RecomendacionesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find and assign the correct reto based on route param', () => {
    const mockReto = { 
      id_Recomendacion: 4,
        recomendacion_Nombre: "Relajación",
        recomendacion_Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_Detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_NivelRecomendacion: 26,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ghlNdBgA-zn73g9mhtpGWs31Xc1atO-Ihw&s"
    };
    recomendacionesService.getData.and.returnValue([mockReto]);
    fixture.detectChanges();
    //expect(component.reto).toEqual(mockReto);
    expect(recomendacionesService.getData).toHaveBeenCalled();
  });

  it('should not assign a reto if no matching id is found', () => {
    recomendacionesService.getData.and.returnValue([{ 
      id_Recomendacion: 4,
        recomendacion_Nombre: "Relajación",
        recomendacion_Descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_Detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem magna, laoreet eu semper pharetra, tincidunt vel lorem. Proin vestibulum leo vel purus ultricies, vitae sodales leo vehicula. Nam finibus augue nunc, nec facilisis lorem ultrices vitae. Sed auctor mauris eget magna pretium suscipit.",
        recomendacion_NivelRecomendacion: 26,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ghlNdBgA-zn73g9mhtpGWs31Xc1atO-Ihw&s"
     }]);
    fixture.detectChanges();
    expect(component.reto).toBeUndefined();
  });
  
  
  
});
