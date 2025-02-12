import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

export interface ColumnProps {
  children?: React.ReactNode;
  className?: string;
  span?: number; // 1-12 grid span
}

const spanToClass = {
  1: "w-1/12",
  2: "w-2/12",
  3: "w-3/12",
  4: "w-4/12",
  5: "w-5/12",
  6: "w-6/12",
  7: "w-7/12",
  8: "w-8/12",
  9: "w-9/12",
  10: "w-10/12",
  11: "w-11/12",
  12: "w-full"
};

export function Column({ children, className, span = 12 }: ColumnProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const widthClass = spanToClass[span as keyof typeof spanToClass] || "w-full";

  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      className={cn(
        "flex flex-col gap-4",
        widthClass,
        className
      )}
    >
      {children}
    </div>
  );
}

Column.craft = {
  displayName: "Column",
  props: {
    span: 12
  }
};