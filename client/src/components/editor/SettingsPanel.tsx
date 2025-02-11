import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export default function SettingsPanel() {
  return (
    <ScrollArea className="h-screen p-4">
      <h2 className="font-semibold mb-4">Settings</h2>
      <Card className="p-4">
        <p className="text-muted-foreground text-sm">
          Select an element to edit its properties
        </p>
      </Card>
    </ScrollArea>
  );
}