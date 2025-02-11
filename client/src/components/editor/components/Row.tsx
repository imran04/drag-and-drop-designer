import { useNode } from "@craftjs/core";

export interface RowProps {
  children?: React.ReactNode;
  className?: string;
}

export function Row({ children, className }: RowProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`flex flex-row gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

Row.craft = {
  displayName: "Row",
};
