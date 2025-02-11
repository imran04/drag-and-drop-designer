import { useEditor, Frame } from "@craftjs/core";
import { Card } from "@/components/ui/card";

export default function Canvas() {
  const { enabled, connectors } = useEditor();

  return (
    <div className="p-4 h-full">
      <Card 
        className="w-full h-full bg-background overflow-auto p-4"
        ref={(ref: HTMLDivElement) => connectors.select(connectors.hover(ref, null), null)}
      >
        <Frame>
          <div className={enabled ? "craftjs-renderer" : undefined}>
            {/* Initial empty state */}
            <div id="canvas" />
          </div>
        </Frame>
      </Card>
    </div>
  );
}