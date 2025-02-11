import { useNode } from "@craftjs/core";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`p-4 border border-dashed border-border rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

Container.craft = {
  displayName: "Container",
};
