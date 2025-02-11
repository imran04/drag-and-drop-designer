import { Editor } from "@/lib/editor";
import Canvas from "@/components/editor/Canvas";
import ComponentPanel from "@/components/editor/ComponentPanel";
import SettingsPanel from "@/components/editor/SettingsPanel";

export default function EditorPage() {
  return (
    <div className="h-screen flex">
      <Editor>
        <div className="w-64 border-r bg-background">
          <ComponentPanel />
        </div>
        <div className="flex-1 bg-muted/30">
          <Canvas />
        </div>
        <div className="w-64 border-l bg-background">
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
}
