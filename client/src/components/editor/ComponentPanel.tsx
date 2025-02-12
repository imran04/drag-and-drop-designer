import { useEditor } from "@craftjs/core";
import { useDraggable } from '@dnd-kit/core';
import { Button } from "@/components/ui/button";
import { componentTypes } from "@/lib/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

// Draggable component wrapper that integrates with dnd-kit
function DraggableComponent({ id, label }: { id: string; label: string }) {
  // Set up draggable functionality using dnd-kit
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

// Component category section with collapsible functionality
function ComponentSection({ category, components }: { 
  category: string; 
  components: Array<{ id: string; label: string; }> 
}) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center w-full mb-2">
        <h3 className="text-sm font-medium text-muted-foreground flex-1">{category}</h3>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-1">
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              label={component.label}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Settings panel for the currently selected component
function SettingsSection() {
  // Get the currently selected component from CraftJS
  const { selected } = useEditor((state) => ({
    selected: state.events.selected
  }));

  return (
    <Card className="p-4 mb-4">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center w-full mb-2">
          <h3 className="text-sm font-medium text-muted-foreground flex-1">Settings</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {selected ? (
            <div className="text-sm">
              Selected component: {selected}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select an element to edit its properties
            </p>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// Main component panel that contains both the component list and settings
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
        <SettingsSection />
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