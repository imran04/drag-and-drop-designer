import { useNode } from "@craftjs/core";
import { Form as UIForm } from "@/components/ui/form";

export interface FormProps {
  children?: React.ReactNode;
}

export function Form({ children }: FormProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <UIForm>{children}</UIForm>
    </div>
  );
}

Form.craft = {
  displayName: "Form",
};
