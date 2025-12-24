import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SceneParams {
  text: string;
  subtitle: string;
  color: {
    primary: string;
    accent: string;
    glow: string;
  };
  material: {
    transparency: number;
    roughness: number;
    metalness: number;
    refractiveIndex: number;
  };
  animation: {
    rotationSpeed: number;
    floatAmplitude: number;
    floatSpeed: number;
  };
  pattern: {
    type: 'grid' | 'waves' | 'particles' | 'circuit' | 'none';
    density: number;
    movement: 'static' | 'flowing' | 'pulsing';
  };
  lighting: {
    ambient: number;
    directional: number;
    spotlightColor: string;
  };
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface SceneStore {
  sceneParams: SceneParams;
  messages: Message[];
  isLoading: boolean;
  updateScene: (params: SceneParams) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
}

// Default scene parameters for the HELLO card
export const DEFAULT_SCENE_PARAMS: SceneParams = {
  text: 'HELLO',
  subtitle: 'AI Powered',
  color: {
    primary: '#00d9ff',
    accent: '#0066ff',
    glow: '#00ffff',
  },
  material: {
    transparency: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    refractiveIndex: 1.5,
  },
  animation: {
    rotationSpeed: 0.005,
    floatAmplitude: 0.3,
    floatSpeed: 0.002,
  },
  pattern: {
    type: 'grid',
    density: 0.3,
    movement: 'static',
  },
  lighting: {
    ambient: 0.4,
    directional: 1.0,
    spotlightColor: '#00d9ff',
  },
};

export const useSceneStore = create<SceneStore>()(
  persist(
    (set) => ({
      sceneParams: DEFAULT_SCENE_PARAMS,
      messages: [],
      isLoading: false,

      updateScene: (params) => set({ sceneParams: params }),

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Date.now().toString(),
              timestamp: Date.now(),
            },
          ],
        })),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'ai-3d-chat-storage',
      partialize: (state) => ({
        messages: state.messages,
        sceneParams: state.sceneParams,
      }),
    }
  )
);
