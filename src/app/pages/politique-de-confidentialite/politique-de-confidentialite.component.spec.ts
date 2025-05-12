import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { PolitiqueDeConfidentialiteComponent } from './politique-de-confidentialite.component';

describe('PolitiqueDeConfidentialiteComponent', () => {
  let component: PolitiqueDeConfidentialiteComponent;
  let fixture: ComponentFixture<PolitiqueDeConfidentialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolitiqueDeConfidentialiteComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolitiqueDeConfidentialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
