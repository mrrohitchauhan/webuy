export class Menus {
  menu: string;
  menucode: string;
  categories: ICategories[];
  isActive: boolean;
}

export interface ICategories {
  name: string;
  subcategories: ISubcategory[];
  isActive: boolean;
}

export interface ISubcategory {
  menu: string;
  url?: string;
  menucode: string;
  isActive: boolean;
}
