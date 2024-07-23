import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

interface PrimaryButtonTypes {
  loading?: boolean;
}

const PrimaryButton = (props: ButtonProps & PrimaryButtonTypes) => {
  const loading = props.loading;
  const btnProps = { ...props };
  delete btnProps.loading;

  return (
    <Button {...btnProps} disabled={props.disabled ?? loading}>
      {props.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
