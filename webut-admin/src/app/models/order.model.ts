export class OrderList {
  userId: string;
  userName: string;
  totalAmount: number;
  status: number;
  transactionId: string;
  docId: string;
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
