import { useDroppable } from '@dnd-kit/core';
import { Card } from "@/components/ui/card";
import { useEditor } from "@/lib/editor";
import { Text } from "./components/Text";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { Row } from "./components/Row";
import { Column } from "./components/Column";

const componentMap = {
  Text,
  Button,
  Container,
  Form,
  Input,
  Row,
  Column,
};

export default function Canvas() {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const { components } = useEditor();

  return (
    <div className="p-4 h-full">
      <Card 
        ref={setNodeRef}
        className="w-full h-full bg-background overflow-auto p-4"
      >
        <div id="canvas-content" className="min-h-[200px]">
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Drag components here
            </div>
          ) : (
            <div className="space-y-4">
              {components.map((component) => {
                const Component = componentMap[component.type as keyof typeof componentMap];
                return Component ? (
                  <Component key={component.id} {...component.props} />
                ) : null;
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}