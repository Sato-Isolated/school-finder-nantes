import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { MentionsLegalesComponent } from './mentions-legales.component';

describe('MentionsLegalesComponent', () => {
  let component: MentionsLegalesComponent;
  let fixture: ComponentFixture<MentionsLegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionsLegalesComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentionsLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
