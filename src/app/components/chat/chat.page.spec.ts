import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPage } from './chat.page';
import { Router } from '@angular/router';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ChatPage', () => {
  let component: ChatPage;
  let fixture: ComponentFixture<ChatPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  //const inputElement = fixture.debugElement.query(By.directive(IonInput));

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ChatPage],
      imports: [FormsModule,IonicModule.forRoot()],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería agregar un mensaje del usuario y una respuesta del chatbot al enviar un mensaje', () => {
    const userMessage = 'Hola, chatbot!';
    component.userInput = userMessage;
    component.sendMessage();
    expect(component.messages.length).toBe(2);
    expect(component.messages[0].text).toBe(userMessage);
    expect(component.messages[0].sender).toBe('user');
    expect(component.messages[1].text).toContain(userMessage);
    expect(component.messages[1].sender).toBe('chatbot');
    expect(component.userInput).toBe('');
  });

  it('no debería enviar un mensaje si el input está vacío o contiene solo espacios', () => {
    component.userInput = '   ';
    component.sendMessage();
    expect(component.messages.length).toBe(0);
    component.userInput = '';
    component.sendMessage();
    expect(component.messages.length).toBe(0);
  });

  it('debería navegar a la página de inicio al llamar a returnToHome', () => {
    component.returnToHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });



  it('debería actualizar el modelo de datos cuando se cambia el input del usuario', () => {
    const inputElement = fixture.debugElement.query(By.css('.mensaje-usuario'));
    expect(inputElement).toBeTruthy();
    inputElement.nativeElement.value = 'Hola!';
    inputElement.nativeElement.dispatchEvent(new Event('.mensaje-usuario'));
    fixture.detectChanges();
    //expect(component.userInput).toBe('Hola!'); 
  });

  
});
