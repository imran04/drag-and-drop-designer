import { useNode } from "@craftjs/core";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
}

export function Image({ src, alt, width = "100%", height = "auto", className }: ImageProps) {
  const {
    connectors: { connect, drag },
  } = useNode();

  const [showInput, setShowInput] = useState(!src);

  const handleImageLoad = () => {
    setShowInput(false);
  };

  const handleImageError = () => {
    setShowInput(true);
  };

  return (
    <div
      ref={(ref: any) => connect(drag(ref))}
      className={cn("relative", className)}
    >
      {showInput ? (
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Input
            type="url"
            placeholder="Enter image URL..."
            defaultValue={src}
            onChange={(e) => {
              const newSrc = e.target.value;
              if (newSrc) {
                // Test if image loads
                const img = new Image();
                img.src = newSrc;
                img.onload = handleImageLoad;
                img.onerror = handleImageError;
              }
            }}
          />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{ width, height }}
          onError={handleImageError}
          className="rounded-lg"
        />
      )}
    </div>
  );
}

Image.craft = {
  displayName: "Image",
  props: {
    src: "",
    alt: "Image",
    width: "100%",
    height: "auto"
  },
};
