import { useNode } from "@craftjs/core";
import { Input as UIInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))} className="space-y-2">
      {label && <Label>{label}</Label>}
      <UIInput type={type} placeholder={placeholder} />
    </div>
  );
}

Input.craft = {
  displayName: "Input",
  props: {
    label: "Label",
    placeholder: "Enter text...",
    type: "text",
  },
};
