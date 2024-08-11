export default interface RootProviderProps {
  children: React.ReactNode;
}

export interface JsonTokenMutateProps {
  db: string;
}

export interface UserInfoUseQueryProps {
  db: string;
  email: string;
}
