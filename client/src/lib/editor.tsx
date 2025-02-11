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
      const componentType = componentTypes.find(c => c.id === active.id);
      if (componentType) {
        const newComponent: ComponentData = {
          id: `${componentType.type}-${Date.now()}`,
          type: componentType.type,
          props: { ...componentType.defaultProps }
        };
        setComponents(prev => [...prev, newComponent]);
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

// Create context for components
interface EditorContextType {
  components: ComponentData[];
}

const EditorContext = createContext<EditorContextType>({ components: [] });
export const useEditor = () => useContext(EditorContext);

// Available component types for the component panel
export const componentTypes = [
  {
    id: "text",
    type: "Text",
    label: "Text Block",
    defaultProps: {
      text: "New Text"
    }
  },
  {
    id: "button",
    type: "Button",
    label: "Button",
    defaultProps: {
      text: "Click Me"
    }
  },
  {
    id: "container",
    type: "Container",
    label: "Container",
    defaultProps: {}
  },
  {
    id: "input",
    type: "Input",
    label: "Input Field",
    defaultProps: {
      placeholder: "Enter text..."
    }
  },
  {
    id: "row",
    type: "Row",
    label: "Row Layout",
    defaultProps: {}
  },
  {
    id: "column",
    type: "Column",
    label: "Column Layout",
    defaultProps: {}
  },
  {
    id: "form",
    type: "Form",
    label: "Form",
    defaultProps: {}
  }
];