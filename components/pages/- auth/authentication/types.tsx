export type authType = "SIGNUP" | "SIGNIN";
export default interface AuthenticationProps {
  selectedForm: authType;
}
export interface AuthenticationMutationProps {
  token: string;
  email: string;
  db: string;
}
