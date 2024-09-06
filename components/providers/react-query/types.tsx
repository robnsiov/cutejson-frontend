export default interface ReqctQueryProviderProps {
  children: React.ReactNode;
}

export type ToastProps = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => void;
