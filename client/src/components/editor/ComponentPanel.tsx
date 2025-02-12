import { useEditor } from "@/lib/editor";
import { useDraggable } from '@dnd-kit/core';
import { Button } from "@/components/ui/button";
import { componentTypes } from "@/lib/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
      className="w-full justify-start text-sm"
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </Button>
  );
}

function ComponentSection({ category, components }: { 
  category: string; 
  components: Array<{ id: string; label: string; }> 
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
      <div className="space-y-1">
        {components.map((component) => (
          <DraggableComponent
            key={component.id}
            id={component.id}
            label={component.label}
          />
        ))}
      </div>
    </div>
  );
}

export default function ComponentPanel() {
  return (
    <ScrollArea className="h-screen">
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Components</h2>
          <p className="text-sm text-muted-foreground">
            Drag and drop components to build your page
          </p>
        </div>
        <Separator className="my-4" />
        {componentTypes.map((section, index) => (
          <div key={section.category}>
            <ComponentSection
              category={section.category}
              components={section.components}
            />
            {index < componentTypes.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}