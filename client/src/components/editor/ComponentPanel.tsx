import { useEditor } from "@craftjs/core";
import { useDraggable } from '@dnd-kit/core';
import { Button } from "@/components/ui/button";
import { componentTypes } from "@/lib/editor";
import { ScrollArea } from "@/components/ui/scroll-area";

function DraggableComponent({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Button
      ref={setNodeRef}
      variant="outline"
      className="w-full justify-start"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </Button>
  );
}

export default function ComponentPanel() {
  return (
    <ScrollArea className="h-screen p-4">
      <h2 className="font-semibold mb-4">Components</h2>
      <div className="space-y-2">
        {componentTypes.map((component) => (
          <DraggableComponent
            key={component.id}
            id={component.id}
            label={component.label}
          />
        ))}
      </div>
    </ScrollArea>
  );
}