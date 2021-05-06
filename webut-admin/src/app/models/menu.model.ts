export class Menus {
  menu: string;
  menucode: string;
  categories: ICategories[];
}

export interface ICategories {
  name: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  menu: string;
  url: string;
  menucode: string;
}
export class MenuList {
  menu: string;
  menuId: string;
  active: boolean;
}
