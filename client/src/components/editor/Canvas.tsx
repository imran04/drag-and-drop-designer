import { useDroppable } from '@dnd-kit/core';
import { Card } from "@/components/ui/card";
import { Element, Frame } from "@craftjs/core";
import { Container } from "./components/Container";

export default function Canvas() {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="p-4 h-full">
      <Card 
        ref={setNodeRef}
        className="w-full h-full bg-background overflow-auto p-4"
      >
        <Frame>
          <Element
            canvas
            is={Container}
            className="min-h-[200px]"
          >
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              Drag components here
            </div>
          </Element>
        </Frame>
      </Card>
    </div>
  );
}