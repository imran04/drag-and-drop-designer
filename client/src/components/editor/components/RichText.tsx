import { useNode } from "@craftjs/core";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      className={cn("relative p-2", className)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <textarea
          className="w-full min-h-[100px] p-2 border rounded-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p className="whitespace-pre-wrap">{text}</p>
      )}
    </div>
  );
}

RichText.craft = {
  displayName: "Rich Text",
  props: {
    content: "Double click to edit this text"
  },
};
