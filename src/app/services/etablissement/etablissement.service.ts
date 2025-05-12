import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EtablissementModel } from '../../models/etablissement.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EtablissementService {
  private baseUrl =
    'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records';
  private ville = 'Nantes';
  constructor(private http: HttpClient) {}

  getTotalSchools$() {
    const url = `${this.baseUrl}?limit=0&where=nom_commune LIKE '${this.ville}'`;
    return this.http.get<{ total_count: number }>(url).pipe(
      map(data => data?.total_count ?? 0)
    );
  }

  getSchools(
    limit = 20,
    offset = 0,
    filters: {
      statut?: string;
      type?: string;
      elevesMin?: number | null;
      elevesMax?: number | null;
      restauration?: boolean;
      hebergement?: boolean;
      ulis?: boolean;
      voie_generale?: boolean;
      voie_technologique?: boolean;
      voie_professionnelle?: boolean;
      anneeMin?: number | null;
      anneeMax?: number | null;
      section_sport?: boolean;
      section_europeenne?: boolean;
    } = {}
  ): Observable<EtablissementModel> {
    let where = `nom_commune='${this.ville}'`;
    if (filters.statut) {
      where += ` AND statut_public_prive='${filters.statut}'`;
    }
    if (filters.type) {
      where += ` AND type_etablissement='${filters.type}'`;
    }
    if (filters.elevesMin != null) {
      where += ` AND nombre_d_eleves>=${filters.elevesMin}`;
    }
    if (filters.elevesMax != null) {
      where += ` AND nombre_d_eleves<=${filters.elevesMax}`;
    }
    if (filters.restauration) {
      where += ` AND restauration=1`;
    }
    if (filters.hebergement) {
      where += ` AND hebergement=1`;
    }
    if (filters.ulis) {
      where += ` AND ulis=1`;
    }
    if (filters.voie_generale) {
      where += ` AND voie_generale=1`;
    }
    if (filters.voie_technologique) {
      where += ` AND voie_technologique=1`;
    }
    if (filters.voie_professionnelle) {
      where += ` AND voie_professionnelle=1`;
    }
    if (filters.anneeMin != null) {
      where += ` AND date_ouverture>='${filters.anneeMin}-01-01'`;
    }
    if (filters.anneeMax != null) {
      where += ` AND date_ouverture<='${filters.anneeMax}-12-31'`;
    }
    if (filters.section_sport) {
      where += ` AND section_sport=1`;
    }
    if (filters.section_europeenne) {
      where += ` AND section_europeenne=1`;
    }
    let url = `${
      this.baseUrl
    }?limit=${limit}&offset=${offset}&where=${encodeURIComponent(where)}`;
    return this.http.get<EtablissementModel>(url);
  }
}
