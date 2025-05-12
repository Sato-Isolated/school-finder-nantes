import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { EtablissementService } from './etablissement.service';

describe('EtablissementService', () => {
  let service: EtablissementService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        EtablissementService
      ]
    });
    service = TestBed.inject(EtablissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call correct URL and emit total schools in getTotalSchools$', (done) => {
    httpClientSpy.get.and.returnValue(of({ total_count: 42 }));
    service.getTotalSchools$().subscribe(total => {
      expect(total).toBe(42);
      expect(httpClientSpy.get).toHaveBeenCalledWith(jasmine.stringMatching(/limit=0/));
      done();
    });
  });

  it('should call correct URL and emit schools in getSchools', (done) => {
    const mockResult = {
      identifiant_de_l_etablissement: '1',
      nom_etablissement: 'Test',
      type_etablissement: 'Lycée',
      statut_public_prive: 'Public',
      adresse_1: '1 rue de Test',
      adresse_2: null,
      adresse_3: '',
      code_postal: '44000',
      code_commune: '44100',
      nom_commune: 'Nantes',
      code_departement: '44',
      code_academie: '01',
      code_region: '52',
      ecole_maternelle: 0,
      ecole_elementaire: 0,
      voie_generale: null,
      voie_technologique: null,
      voie_professionnelle: null,
      telephone: '0102030405',
      fax: null,
      web: null,
      mail: 'test@mail.com',
      restauration: 1,
      hebergement: 0,
      ulis: 0,
      apprentissage: null,
      segpa: null,
      section_arts: null,
      section_cinema: null,
      section_theatre: null,
      section_sport: null,
      section_internationale: null,
      section_europeenne: null,
      lycee_agricole: null,
      lycee_militaire: null,
      lycee_des_metiers: null,
      post_bac: null,
      appartenance_education_prioritaire: null,
      greta: null,
      siren_siret: '123456789',
      nombre_d_eleves: 500,
      fiche_onisep: null,
      position: { lon: -1.55, lat: 47.22 },
      type_contrat_prive: '',
      libelle_departement: 'Loire-Atlantique',
      libelle_academie: 'Nantes',
      libelle_region: 'Pays de la Loire',
      coordx_origine: 0,
      coordy_origine: 0,
      epsg_origine: '',
      nom_circonscription: '',
      latitude: 47.22,
      longitude: -1.55,
      precision_localisation: '',
      date_ouverture: new Date(),
      date_maj_ligne: new Date(),
      etat: '',
      ministere_tutelle: '',
      multi_uai: 0,
      rpi_concentre: 0,
      rpi_disperse: null,
      code_nature: 0,
      libelle_nature: '',
      code_type_contrat_prive: '',
      pial: '',
      etablissement_mere: null,
      type_rattachement_etablissement_mere: null,
      code_circonscription: '',
      code_zone_animation_pedagogique: null,
      libelle_zone_animation_pedagogique: null,
      code_bassin_formation: '',
      libelle_bassin_formation: ''
    };
    const mockResponse = { total_count: 1, results: [mockResult] };
    httpClientSpy.get.and.returnValue(of(mockResponse));
    service.getSchools(10, 0, { statut: 'Public', type: 'Lycée' }).subscribe(data => {
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
    service.getSchools(5, 0, { elevesMin: 100, restauration: true, ulis: true }).subscribe(() => {
      const url = httpClientSpy.get.calls.mostRecent().args[0];
      const decodedUrl = decodeURIComponent(url);
      expect(decodedUrl).toContain('nombre_d_eleves>=100');
      expect(decodedUrl).toContain('restauration=1');
      expect(decodedUrl).toContain('ulis=1');
      done();
    });
  });
});
