export class UserTransaction {
  transactionId: string;
  userId: string;
  products: IProduct[];
  createdOn: string;
  status: number;
  totalAmount: number;
  subTotal: number;
  shippingCharges: number;
  discount: number;
  personalDetails?: IPersonalDetails;
}
export interface IPersonalDetails{
  firstName: string;
  lastName: string;
  street: string;
  district: string;
  zip: string;
  state: string;
  country: string;
  mobile: string;
}
export interface IProduct {
  productId: string;
  quantity: number;
}

export class UserTransactionList {
  date: string;
  total: number;
  status: number;
  transactionsId: string;
}
