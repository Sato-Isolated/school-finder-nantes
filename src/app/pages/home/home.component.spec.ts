import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtablissementService } from '../../services/etablissement/etablissement.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        EtablissementService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
