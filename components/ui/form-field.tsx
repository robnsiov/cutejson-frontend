import cls from "classnames";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./input";
import { Textarea } from "./textarea";
const FormFieldElement = ({
  control,
  error,
  name,
  autoComplete,
  placeholder,
  type = "text",
  textarea,
}: {
  control: any;
  error?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <FormItem className="w-full">
            <FormControl className="w-full">
              <>
                {textarea && (
                  <Textarea
                    autoComplete={autoComplete}
                    {...field}
                    spellCheck={false}
                    placeholder={placeholder}
                    className={cls(`w-full mb-2 min-h-[150px]`, {
                      "!ring-1 !ring-red-500 placeholder:text-red-500":
                        name && errors[name]?.message,
                    })}
                  />
                )}
                {!textarea && (
                  <Input
                    autoComplete={autoComplete}
                    {...field}
                    type={type}
                    spellCheck={false}
                    placeholder={placeholder}
                    className={cls(`w-full mb-2`, {
                      "!ring-1 !ring-red-500 placeholder:text-red-500":
                        name && errors[name]?.message,
                    })}
                  />
                )}
              </>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFieldElement;
