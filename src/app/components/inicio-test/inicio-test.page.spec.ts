import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioTestPage } from './inicio-test.page';

describe('InicioTestPage', () => {
  let component: InicioTestPage;
  let fixture: ComponentFixture<InicioTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
