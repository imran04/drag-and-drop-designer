import { Editor as CraftEditor, Frame } from '@craftjs/core';
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

export function Editor({ children }: EditorProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = useCallback((event: any) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && over.id === 'canvas') {
      const componentType = componentTypes.find(c => c.components.find(comp => comp.id === active.id));
      if (componentType) {
        const foundComponent = componentType.components.find(comp => comp.id === active.id);
        if(foundComponent) {
          console.log('Component dropped:', foundComponent.type);
        }
      }
    }
  }, []);

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
    </CraftEditor>
  );
}

// Available component types for the component panel
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