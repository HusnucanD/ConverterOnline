export interface Category {
  id: string;
  name: string;
  logo: string;
}

export interface Unit {
  id: string;
  name: string;
  shortName: string;
  categoryId: string;
  conversions: Record<string, string>;
  description: string;
  standard: string[];
}

export interface UnitsPayload {
  categories: Category[];
  units: Unit[];
}
