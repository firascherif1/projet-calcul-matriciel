import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VecteurComponent } from './vecteur.component';

describe('VecteurComponent', () => {
  let component: VecteurComponent;
  let fixture: ComponentFixture<VecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
