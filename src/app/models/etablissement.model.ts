export interface EtablissementModel {
  total_count: number;
  results: Result[];
}

export interface Result {
  identifiant_de_l_etablissement: string;
  nom_etablissement: string;
  type_etablissement: string;
  statut_public_prive: string;
  adresse_1: string;
  adresse_2: null;
  adresse_3: string;
  code_postal: string;
  code_commune: string;
  nom_commune: string;
  code_departement: string;
  code_academie: string;
  code_region: string;
  ecole_maternelle: number;
  ecole_elementaire: number;
  voie_generale: null;
  voie_technologique: null;
  voie_professionnelle: null;
  telephone: string;
  fax: null;
  web: null;
  mail: string;
  restauration: number;
  hebergement: number;
  ulis: number;
  apprentissage: null;
  segpa: null;
  section_arts: null;
  section_cinema: null;
  section_theatre: null;
  section_sport: null;
  section_internationale: null;
  section_europeenne: null;
  lycee_agricole: null;
  lycee_militaire: null;
  lycee_des_metiers: null;
  post_bac: null;
  appartenance_education_prioritaire: null;
  greta: null;
  siren_siret: string;
  nombre_d_eleves: number;
  fiche_onisep: null;
  position: Position;
  type_contrat_prive: string;
  libelle_departement: string;
  libelle_academie: string;
  libelle_region: string;
  coordx_origine: number;
  coordy_origine: number;
  epsg_origine: string;
  nom_circonscription: string;
  latitude: number;
  longitude: number;
  precision_localisation: string;
  date_ouverture: Date;
  date_maj_ligne: Date;
  etat: string;
  ministere_tutelle: string;
  multi_uai: number;
  rpi_concentre: number;
  rpi_disperse: null;
  code_nature: number;
  libelle_nature: string;
  code_type_contrat_prive: string;
  pial: string;
  etablissement_mere: null;
  type_rattachement_etablissement_mere: null;
  code_circonscription: string;
  code_zone_animation_pedagogique: null;
  libelle_zone_animation_pedagogique: null;
  code_bassin_formation: string;
  libelle_bassin_formation: string;
}

export interface Position {
  lon: number;
  lat: number;
}
