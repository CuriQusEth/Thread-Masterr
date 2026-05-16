import { create } from 'zustand';

export type ThreadType = 'Light' | 'Shadow' | 'Star' | 'Ember' | 'Void' | 'Harmony';

export const THREAD_COLORS: Record<ThreadType, string> = {
  Light: '#fffde7',
  Shadow: '#4a148c',
  Star: '#00e5ff',
  Ember: '#ff3d00',
  Void: '#212121',
  Harmony: '#b2fcff',
};

export const THREAD_GLOW: Record<ThreadType, string> = {
  Light: '#fff59d',
  Shadow: '#7b1fa2',
  Star: '#84ffff',
  Ember: '#ff8a65',
  Void: '#5e35b1',
  Harmony: '#ffffff',
};

export interface Node {
  id: string;
  x: number;
  y: number;
  type?: ThreadType;   // The dominant thread type passing through
  basePhase: number;   // For drifting animation
}

export interface Thread {
  id: string;
  startNodeId: string;
  endNodeId: string;
  type: ThreadType;
  strength: number; 
}

interface GameState {
  nodes: Node[];
  threads: Thread[];
  inventory: Record<ThreadType, number>;
  activeType: ThreadType;
  harmonyScore: number;
  
  // Actions
  setActiveType: (type: ThreadType) => void;
  addNode: (node: Node) => void;
  connectNodes: (startId: string, endId: string, type: ThreadType) => void;
  calculateResonance: () => void;
  initLevel: (width: number, height: number) => void;
  
  // Interaction state
  dragStartNode: string | null;
  setDragStartNode: (id: string | null) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useGameStore = create<GameState>((set, get) => ({
  nodes: [],
  threads: [],
  inventory: {
    Light: 10,
    Shadow: 10,
    Star: 5,
    Ember: 5,
    Void: 2,
    Harmony: 1,
  },
  activeType: 'Light',
  harmonyScore: 0,
  dragStartNode: null,

  setActiveType: (type) => set({ activeType: type }),
  setDragStartNode: (id) => set({ dragStartNode: id }),

  initLevel: (w, h) => {
    // Generate a beautiful constellation of initial nodes
    const initialNodes: Node[] = [];
    const centerX = w / 2;
    const centerY = h / 2;
    
    // Core node
    initialNodes.push({ id: generateId(), x: centerX, y: centerY, basePhase: Math.random() * Math.PI * 2 });
    
    // Ring 1
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 / 6) * i;
      const r = 80;
      initialNodes.push({
        id: generateId(),
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
        basePhase: Math.random() * Math.PI * 2
      });
    }

    // Ring 2
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      const r = 180;
      initialNodes.push({
        id: generateId(),
        x: centerX + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * r,
        basePhase: Math.random() * Math.PI * 2
      });
    }

    // A few outliers
    for (let i = 0; i < 8; i++) {
      initialNodes.push({
        id: generateId(),
        x: Math.random() * w,
        y: Math.random() * h,
        basePhase: Math.random() * Math.PI * 2
      });
    }

    set({ nodes: initialNodes, threads: [] });
  },

  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  
  connectNodes: (startId, endId, type) => set((state) => {
    if (startId === endId) return state; // Can't connect to self
    
    // Check if connection already exists
    const exists = state.threads.find(
      t => (t.startNodeId === startId && t.endNodeId === endId) ||
           (t.startNodeId === endId && t.endNodeId === startId)
    );

    if (exists) {
      // If same type, increase strength. Otherwise do nothing.
      if (exists.type === type) {
        return {
          threads: state.threads.map(t => t.id === exists.id ? { ...t, strength: t.strength + 1 } : t),
          harmonyScore: state.harmonyScore + 10
        };
      }
      return state;
    }

    // Check inventory
    if (state.inventory[type] <= 0) return state;

    // Trigger haptics if supported
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    const newThread: Thread = {
      id: generateId(),
      startNodeId: startId,
      endNodeId: endId,
      type,
      strength: 1
    };

    return {
      threads: [...state.threads, newThread],
      inventory: { ...state.inventory, [type]: state.inventory[type] - 1 },
      harmonyScore: state.harmonyScore + 50
    };
  }),

  calculateResonance: () => {
    // Advanced scoring logic combining node connections, symmetry, etc.
    // For now simple bump.
    set(state => ({ harmonyScore: state.harmonyScore + state.threads.length * 10 }));
  }
}));
