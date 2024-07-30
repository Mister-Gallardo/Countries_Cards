export interface ICountry {
  name: { common: string, official: string };
  capital: string[];
  flag: string;
  flags: { alt: string, svg: string };
  area: number;
  population: number;
  continents: string[];
}
