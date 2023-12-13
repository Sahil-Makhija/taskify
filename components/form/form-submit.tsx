import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
interface FormSubmitProps {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
export const FormSubmit = ({
  children,
  disabled,
  className,
  variant="primary",
}: FormSubmitProps) => {
    const {pending} = useFormStatus();
  return (
    <Button
      variant={variant}
      disabled={disabled || pending}
      className={className}
    >
      {children}
    </Button>
  );
};
