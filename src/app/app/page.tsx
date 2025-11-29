"use client";

import Canvas from "@/components/builder/Canvas";
import { useEditorStore } from "@/stores/editor";
import { LayoutTemplate, Type, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
  const { addBlock } = useEditorStore();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Toolbar) */}
      <aside className="w-64 border-r bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">Builder Tools</h2>
        
        <div className="space-y-3">
          <button 
            onClick={() => addBlock("hero")}
            className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 hover:border-black transition"
          >
            <LayoutTemplate size={20} />
            <span className="font-medium">Hero Section</span>
          </button>

          <button 
            onClick={() => addBlock("text")}
            className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 hover:border-black transition"
          >
            <Type size={20} />
            <span className="font-medium">Text Block</span>
          </button>

          <button 
            onClick={() => addBlock("product-grid")}
            className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 hover:border-black transition"
          >
            <ShoppingCart size={20} />
            <span className="font-medium">Product Grid</span>
          </button>
        </div>
      </aside>

      {/* Main Area (Canvas) */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Editing: My Cool Store</h1>
          <button className="rounded-full bg-black px-6 py-2 text-white hover:bg-gray-800">
            Publish Changes
          </button>
        </div>
        
        <Canvas />
      </main>
    </div>
  );
}