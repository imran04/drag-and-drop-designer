import { useEditor } from "@craftjs/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPanel() {
  const { selected } = useEditor((state) => ({
    selected: state.nodes[state.events.selected?.id],
  }));

  if (!selected) {
    return (
      <div className="p-4">
        <h2 className="font-semibold mb-4">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  const { props, displayName } = selected;

  return (
    <ScrollArea className="h-screen p-4">
      <h2 className="font-semibold mb-4">Settings</h2>
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">{displayName}</h3>
        {Object.entries(props).map(([key, value]) => (
          <div key={key} className="space-y-2 mb-4">
            <Label htmlFor={key}>{key}</Label>
            <Input
              id={key}
              value={value as string}
              onChange={(e) =>
                selected.actions.setProp(key, e.target.value)
              }
            />
          </div>
        ))}
      </Card>
    </ScrollArea>
  );
}
