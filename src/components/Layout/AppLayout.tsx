import { Scene } from '../Scene/Scene';
import { ChatPanel } from '../Chat/ChatPanel';

export function AppLayout() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Chat Panel - Left Side */}
      <div className="w-1/2 h-full">
        <ChatPanel />
      </div>

      {/* 3D Scene - Right Side */}
      <div className="w-1/2 h-full">
        <Scene />
      </div>
    </div>
  );
}
