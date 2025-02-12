import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export interface CustomProps {
  content: string;
  className?: string;
}

export function Custom({ content, className }: CustomProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      className={cn("relative", className)}
    >
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            {content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

Custom.craft = {
  displayName: "Custom Block",
  props: {
    content: "Custom content goes here"
  },
};
