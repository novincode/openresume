"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

// Original AspectRatio component
function RadixAspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

// Extended AspectRatio with custom height and width handling
type ExtendedAspectRatioProps = React.ComponentProps<typeof AspectRatioPrimitive.Root> & {
  height?: "max" | number | string;
  width?: "auto" | number | string;
};

function AspectRatio({
  ratio,
  height,
  width,
  className,
  style: propStyle,
  children,
  ...props
}: ExtendedAspectRatioProps) {
  // Create a mutable style object
  const style: React.CSSProperties = { ...propStyle };
  
  // Handle height
  if (height === "max") {
    style.height = "100%";
    style.flexGrow = 1; // Allow it to grow and fill the container
  } else if (typeof height === "number") {
    style.height = `${height}px`;
  } else if (typeof height === "string" && height !== "auto") {
    style.height = height;
  }
  
  // Handle width
  if (width === "auto" && height && height !== "auto") {
    // Preserve aspect ratio
    style.width = "auto"; // Base setting
    style.aspectRatio = `${ratio}`;
    style.maxWidth = "unset"; // Override any max-width that might interfere
  } else if (typeof width === "number") {
    style.width = `${width}px`;
  } else if (typeof width === "string" && width !== "auto") {
    style.width = width;
  }
  
  return (
    <div className={cn("relative", className)} style={style}>
      <RadixAspectRatio ratio={ratio} {...props}>
        {children}
      </RadixAspectRatio>
    </div>
  );
}

// Helper hook for computing aspect ratio from width/height
export function useAspectRatio(width: number, height: number) {
  return React.useMemo(() => (height > 0 ? width / height : 1), [width, height])
}

export { AspectRatio }
