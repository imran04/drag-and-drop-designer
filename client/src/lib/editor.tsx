import { Editor as CraftEditor, Frame, useEditor } from '@craftjs/core';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, DragEndEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import { Container } from '@/components/editor/components/Container';
import { Row } from '@/components/editor/components/Row';
import { Column } from '@/components/editor/components/Column';
import { RichText } from '@/components/editor/components/RichText';
import { Button } from '@/components/editor/components/Button';
import { Heading } from '@/components/editor/components/Heading';
import { Image } from '@/components/editor/components/Image';
import { Custom } from '@/components/editor/components/Custom';

interface EditorProps {
  children: React.ReactNode;
}

// Inner component that handles drag and drop functionality
function EditorComponent({ children }: EditorProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { actions } = useEditor(); // CraftJS actions for managing components

  // Configure mouse and touch sensors for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // Track the currently dragged component
  const handleDragStart = useCallback((event: any) => {
    setActiveId(event.active.id);
  }, []);

  // Handle component drops on the canvas
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === 'canvas') {
      // Find the dropped component type and create it
      const componentType = componentTypes.find(c => c.components.find(comp => comp.id === active.id));
      if (componentType) {
        const foundComponent = componentType.components.find(comp => comp.id === active.id);
        if(foundComponent) {
          const nodeId = `${foundComponent.type}-${Date.now()}`;
          // Add the component to the CraftJS tree
          actions.add(
            foundComponent.type,
            { ...foundComponent.defaultProps },
            'ROOT'
          );
        }
      }
    }
  }, [actions]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeId ? <div>Dragging {activeId}</div> : null}
      </DragOverlay>
    </DndContext>
  );
}

// Main Editor wrapper that provides CraftJS context
export function Editor({ children }: EditorProps) {
  return (
    <CraftEditor
      resolver={{
        Container,
        Row,
        Column,
        RichText,
        Button,
        Heading,
        Image,
        Custom
      }}
    >
      <EditorComponent>{children}</EditorComponent>
    </CraftEditor>
  );
}

// Define available component types for the component panel
export const componentTypes = [
  {
    category: "Layout",
    components: [
      {
        id: "container",
        type: "Container",
        label: "Container",
        defaultProps: {}
      },
      {
        id: "row",
        type: "Row",
        label: "Row",
        defaultProps: {}
      },
      {
        id: "column",
        type: "Column",
        label: "Column",
        defaultProps: {
          span: 12 // Default to full width
        }
      }
    ]
  },
  {
    category: "Blocks",
    components: [
      {
        id: "text",
        type: "RichText",
        label: "Paragraph",
        defaultProps: {
          content: "Enter your text here..."
        }
      },
      {
        id: "heading",
        type: "Heading",
        label: "Heading",
        defaultProps: {
          level: 1,
          text: "Heading"
        }
      },
      {
        id: "button",
        type: "Button",
        label: "Button",
        defaultProps: {
          text: "Click Me",
          variant: "default"
        }
      },
      {
        id: "image",
        type: "Image",
        label: "Image",
        defaultProps: {
          src: "",
          alt: "Image",
          width: "100%",
          height: "auto"
        }
      },
      {
        id: "custom",
        type: "Custom",
        label: "Custom Block",
        defaultProps: {
          content: "Custom content goes here"
        }
      }
    ]
  }
];
