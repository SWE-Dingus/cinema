export enum AuthorizationLevel {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  authorizationLevel: AuthorizationLevel;
  wantsMarketingEmails: boolean;
}
