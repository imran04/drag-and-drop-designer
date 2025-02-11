import { useNode } from "@craftjs/core";

export interface TextProps {
  text: string;
  className?: string;
}

export function Text({ text, className }: TextProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <p className={className}>{text}</p>
    </div>
  );
}

Text.craft = {
  displayName: "Text",
  props: {
    text: "Click to edit text",
  },
};
