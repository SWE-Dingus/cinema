export enum AuthorizationLevel {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
}

export enum UserState {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  authorizationLevel: AuthorizationLevel;
  wantsMarketingEmails: boolean;
  userState: UserState;
}
