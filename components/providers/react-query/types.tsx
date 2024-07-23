export default interface ReqctQueryProviderTypes {
  children: React.ReactNode;
}

export type ToastTypes = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => void;
