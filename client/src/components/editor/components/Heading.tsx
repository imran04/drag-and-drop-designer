import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";

export interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const headingStyles = {
  1: "text-4xl font-extrabold",
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
  6: "text-base font-medium"
};

export function Heading({ text, level = 1, className }: HeadingProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const style = headingStyles[level as keyof typeof headingStyles];

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Tag className={cn(style, className)}>{text}</Tag>
    </div>
  );
}

Heading.craft = {
  displayName: "Heading",
  props: {
    text: "Heading",
    level: 1
  }
};
