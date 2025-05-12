import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { SchoolDetailsModalComponent } from './school-details-modal.component';
import { EtablissementService } from '../../services/etablissement/etablissement.service';

describe('SchoolDetailsModalComponent', () => {
  let component: SchoolDetailsModalComponent;
  let fixture: ComponentFixture<SchoolDetailsModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SchoolDetailsModalComponent>>;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let service: EtablissementService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    (breakpointObserverSpy.observe as jasmine.Spy).and.returnValue(
      of({ matches: false })
    );
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      imports: [
        SchoolDetailsModalComponent,
        MatIconTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nom_etablissement: 'Test',
            latitude: 47,
            longitude: -1,
            mail: 'test@mail.com',
          },
        },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
        { provide: EtablissementService, useClass: EtablissementService },
        { provide: HttpClient, useValue: httpClientSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DOCUMENT, useValue: document },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolDetailsModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EtablissementService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal when closeModal is called', () => {
    component.closeModal();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should set isSmallScreen to true if breakpoint matches', () => {
    const observerResult = { matches: true };
    (breakpointObserverSpy.observe as jasmine.Spy).and.returnValue(
      of(observerResult)
    );
    component = fixture.componentInstance;
    expect(component.isSmallScreen).toBe(false); // initial
    component['breakpointObserver']
      .observe(['(max-width: 600px)'])
      .subscribe((result: any) => {
        expect(result.matches).toBeTrue();
        component.isSmallScreen = result.matches;
        expect(component.isSmallScreen).toBeTrue();
      });
  });

  // Optionally, test ARIA attributes in the template
  it('should have role dialog and aria-modal in the template', () => {
    const dialogEl = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialogEl).toBeTruthy();
    expect(dialogEl.getAttribute('aria-modal')).toBe('true');
  });

  it('should call correct URL and emit schools in getSchools', (done) => {
    const mockResponse = { total_count: 1, results: [] };
    httpClientSpy.get.and.returnValue(of(mockResponse));
    const testService = new EtablissementService(httpClientSpy as any);
    testService
      .getSchools(10, 0, { statut: 'Public', type: 'Lycée' })
      .subscribe((data) => {
        expect(data).toEqual(mockResponse);
        const url = httpClientSpy.get.calls.mostRecent().args[0];
        const decodedUrl = decodeURIComponent(url);
        expect(decodedUrl).toContain("statut_public_prive='Public'");
        expect(decodedUrl).toContain("type_etablissement='Lycée'");
        done();
      });
  });

  it('should add filters to the query string in getSchools', (done) => {
    httpClientSpy.get.and.returnValue(of({}));
    const testService = new EtablissementService(httpClientSpy as any);
    testService
      .getSchools(5, 0, { elevesMin: 100, restauration: true, ulis: true })
      .subscribe(() => {
        const url = httpClientSpy.get.calls.mostRecent().args[0];
        const decodedUrl = decodeURIComponent(url);
        expect(decodedUrl).toContain('nombre_d_eleves>=100');
        expect(decodedUrl).toContain('restauration=1');
        expect(decodedUrl).toContain('ulis=1');
        done();
      });
  });
});
