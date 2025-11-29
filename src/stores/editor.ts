import { create } from 'zustand';

export type BlockType = 'hero' | 'text' | 'product-grid';

export interface Block {
  id: string;
  type: BlockType;
  content: {
    title?: string;
    subtitle?: string;
    body?: string;
  }; 
}

interface EditorState {
  blocks: Block[];
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, content: Partial<Block['content']>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  blocks: [],
  
  // ACTION 1: ADD
  addBlock: (type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        { 
          id: crypto.randomUUID(), 
          type, 
          content: {
            // We set default text here so the inputs aren't empty
            title: type === 'hero' ? 'Welcome to My Store' : 'Section Title',
            subtitle: 'Best products in the world',
            body: 'Write your content here...',
          } 
        },
      ],
    })),

  // ACTION 2: REMOVE
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    })),

  // ACTION 3: UPDATE (This is what allows you to type!)
  updateBlock: (id, newContent) =>
    set((state) => ({
      blocks: state.blocks.map((b) => 
        // We find the matching block and merge the new text in
        b.id === id ? { ...b, content: { ...b.content, ...newContent } } : b
      ),
    })),
}));