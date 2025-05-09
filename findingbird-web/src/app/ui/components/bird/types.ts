export type Bird = {
  id: string;
  speciesName: string;
  scientificName: string;
  habitatType: string;
  appearanceCount: number;
  morphoTrait: string;
  ecoTrait: string;
  districts: string[];
  imageUrl: string;
  realImageUrl: string | undefined;
};