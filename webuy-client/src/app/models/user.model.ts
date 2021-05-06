import { IPersonalDetails } from './user.transaction.model';
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  transactionId?: string;
  createdOn: string;
  personalDetails?: IPersonalDetails;
}
