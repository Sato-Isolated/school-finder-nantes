import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter schools by searchTerm', () => {
    component.schools = [
      { nom_etablissement: 'Lycée Jules Verne', type_etablissement: 'Lycée', statut_public_prive: 'Public', nom_commune: 'Nantes', code_postal: '44000' },
      { nom_etablissement: 'Collège Jean Moulin', type_etablissement: 'Collège', statut_public_prive: 'Privé', nom_commune: 'Nantes', code_postal: '44000' }
    ] as any;
    component.searchTerm = 'Jules';
    expect(component.filteredSchools.length).toBe(1);
    expect(component.filteredSchools[0].nom_etablissement).toContain('Jules');
  });

  it('should reset filters', () => {
    component.filters.type = 'Lycée';
    component.filters.statut = 'Public';
    component.schools = [{ nom_etablissement: 'Test', type_etablissement: 'Lycée', statut_public_prive: 'Public', nom_commune: 'Nantes', code_postal: '44000' } as any];
    component.resetFilters();
    expect(component.filters.type).toBe('');
    expect(component.filters.statut).toBe('');
    expect(component.schools.length).toBe(0);
  });

  it('should open details modal', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.callThrough();
    component.openDetails({ nom_etablissement: 'Test' });
    expect(dialogSpy).toHaveBeenCalled();
  });
});
