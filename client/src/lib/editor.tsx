import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, DragEndEvent } from '@dnd-kit/core';
import { useCallback, useState, createContext, useContext } from 'react';

interface EditorProps {
  children: React.ReactNode;
}

export interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
}

export const Editor = ({ children }: EditorProps) => {
  const [components, setComponents] = useState<ComponentData[]>([]);
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
        if(foundComponent){
          const newComponent: ComponentData = {
            id: `${foundComponent.type}-${Date.now()}`,
            type: foundComponent.type,
            props: { ...foundComponent.defaultProps }
          };
          setComponents(prev => [...prev, newComponent]);
        }
      }
    }
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <EditorContext.Provider value={{ components }}>
        {children}
      </EditorContext.Provider>
      <DragOverlay>
        {activeId ? <div>Dragging {activeId}</div> : null}
      </DragOverlay>
    </DndContext>
  );
};

interface EditorContextType {
  components: ComponentData[];
}

const EditorContext = createContext<EditorContextType>({ components: [] });
export const useEditor = () => useContext(EditorContext);

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