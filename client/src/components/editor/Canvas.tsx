import { useDroppable } from '@dnd-kit/core';
import { Card } from "@/components/ui/card";

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
        <div id="canvas-content" className="min-h-[200px]">
          {/* Elements will be rendered here */}
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Drag components here
          </div>
        </div>
      </Card>
    </div>
  );
}