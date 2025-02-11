import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useCallback, useState } from 'react';

interface EditorProps {
  children: React.ReactNode;
}

export const Editor = ({ children }: EditorProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = useCallback((event: any) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: any) => {
    setActiveId(null);
  }, []);

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
};

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