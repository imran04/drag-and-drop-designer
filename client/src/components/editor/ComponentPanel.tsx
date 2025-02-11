import { useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import { componentTypes } from "@/lib/editor";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ComponentPanel() {
  const { connectors } = useEditor();

  return (
    <ScrollArea className="h-screen p-4">
      <h2 className="font-semibold mb-4">Components</h2>
      <div className="space-y-2">
        {componentTypes.map((component) => (
          <Button
            key={component.type}
            variant="outline"
            className="w-full justify-start"
            ref={(ref: HTMLButtonElement) =>
              connectors.create(ref, component)}
          >
            {component.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
