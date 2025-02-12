import { useDroppable } from '@dnd-kit/core';
import { Card } from "@/components/ui/card";
import { Element, Frame } from "@craftjs/core";
import { Container } from "./components/Container";

// Canvas component - the main drop target area for components
export default function Canvas() {
  // Set up the droppable area using dnd-kit
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="p-4 h-full">
      <Card 
        ref={setNodeRef}
        className="w-full h-full bg-background overflow-auto p-4"
      >
        {/* CraftJS Frame component manages the editor state */}
        <Frame>
          {/* Root container element that can accept dropped components */}
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