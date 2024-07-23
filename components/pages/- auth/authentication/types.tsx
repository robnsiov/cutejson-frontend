export type authType = "SIGNUP" | "SIGNIN";
export default interface AuthenticationTypes {
  selectedForm: authType;
}
export interface AuthenticationMutationTypes {
  token: string;
  email: string;
  db: string;
}
