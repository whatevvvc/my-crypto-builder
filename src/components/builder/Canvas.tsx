"use client";

import { useEditorStore } from "@/stores/editor";
import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

export default function Canvas() {
  const { blocks, removeBlock } = useEditorStore();
  
  // This makes the div "droppable" (it accepts dragged items)
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[600px] w-full max-w-4xl mx-auto mt-10 rounded-xl border-2 border-dashed transition-colors duration-200 
      ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
    >
      {blocks.length === 0 ? (
        <div className="flex h-full min-h-[600px] flex-col items-center justify-center text-gray-400">
          <p className="text-xl font-medium">Your canvas is empty</p>
          <p className="text-sm">Click the buttons on the left to add blocks</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-8">
          {blocks.map((block) => (
            <div 
              key={block.id} 
              className="group relative rounded-lg border bg-white p-6 shadow-sm hover:ring-2 hover:ring-blue-500"
            >
              {/* Delete Button (Only shows on hover) */}
              <button 
                onClick={() => removeBlock(block.id)}
                className="absolute right-4 top-4 opacity-0 transition group-hover:opacity-100 text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 size={18} />
              </button>

              {/* Render the actual block content */}
              {block.type === "hero" && (
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900">Big Hero Headline</h1>
                  <p className="mt-4 text-xl text-gray-500">This is where your subtitle goes.</p>
                </div>
              )}

              {block.type === "text" && (
                <div className="prose max-w-none">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Add your text here.</p>
                </div>
              )}

              {block.type === "product-grid" && (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 rounded bg-gray-100 animate-pulse"></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}