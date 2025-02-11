import { useNode } from "@craftjs/core";
import { Button as UIButton } from "@/components/ui/button";

export interface ButtonProps {
  text: string;
  variant?: "default" | "outline" | "secondary";
}

export function Button({ text, variant = "default" }: ButtonProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <UIButton variant={variant}>{text}</UIButton>
    </div>
  );
}

Button.craft = {
  displayName: "Button",
  props: {
    text: "Click me",
    variant: "default",
  },
};
