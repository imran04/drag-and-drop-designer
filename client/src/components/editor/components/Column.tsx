import { useNode } from "@craftjs/core";

export interface ColumnProps {
  children?: React.ReactNode;
  className?: string;
}

export function Column({ children, className }: ColumnProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`flex flex-col gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

Column.craft = {
  displayName: "Column",
};
