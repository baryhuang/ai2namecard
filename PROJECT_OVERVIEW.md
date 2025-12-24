# AI-Driven 3D Object Generator

A fancy AI chat-driven 3D object generator built with React, Three.js, and InsForge backend.

## 🎨 What It Does

This application creates an interactive 3D glass namecard that evolves based on conversational AI input. Users chat with Claude Sonnet 4.5, which interprets their creative intent and transforms it into visual parameters for a futuristic, floating 3D object.

## ✨ Features

- **AI-Powered Design**: Chat with Claude Sonnet 4.5 to describe your vision
- **Dynamic 3D Scene**: Real-time updates to a glass namecard with:
  - Semi-transparent glass material with realistic reflections
  - Dynamic text and subtitle
  - Customizable colors and lighting
  - Pattern overlays (grid, particles, waves, circuit)
  - Smooth floating and rotation animations
- **Split-Screen Layout**: Chat interface on left, 3D scene on right
- **Persistent State**: Chat history and scene parameters saved to localStorage
- **Streaming Responses**: See AI typing in real-time

## 🏗️ Architecture

```
Frontend (React + Vite)
├── Three.js Scene (React Three Fiber)
│   ├── Glass namecard with PBR materials
│   ├── Dynamic lighting system
│   └── Pattern generators
├── Chat Interface
│   ├── Message history
│   ├── Streaming AI responses
│   └── Input area
└── State Management (Zustand)
    ├── Scene parameters
    ├── Chat messages
    └── Loading states

Backend (InsForge)
└── AI Integration (Claude Sonnet 4.5)
    └── Creative interpretation system
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- InsForge account with API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (already set in `.env`):
   ```
   VITE_INSFORGE_BASE_URL=https://tizjuia4.us-west.insforge.app
   VITE_INSFORGE_ANON_KEY=your-anon-key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173

## 🎮 How to Use

1. The app starts with a default "HELLO - AI Powered" glass card
2. Type creative prompts in the chat, such as:
   - "Make it feel like a sunset"
   - "Add my name: Alex"
   - "Give it cyberpunk vibes"
   - "Calm ocean feeling"
   - "Futuristic and professional"

3. Claude Sonnet 4.5 interprets your intent (not literally!) and updates:
   - Text content
   - Colors and lighting
   - Material properties
   - Animation speed
   - Pattern overlays

4. Watch the 3D scene smoothly transition to match the AI's creative vision

## 🎨 Scene Parameters

The AI controls these aspects of the 3D object:

- **Text**: Main heading (max 20 characters)
- **Subtitle**: Secondary text (max 15 characters)
- **Colors**: Primary, accent, and glow colors
- **Material**: Transparency, roughness, metalness, refractive index
- **Animation**: Rotation speed, float amplitude, float speed
- **Pattern**: Type (grid/waves/particles/circuit/none), density, movement
- **Lighting**: Ambient, directional, spotlight color

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand (with localStorage persistence)
- **Backend**: InsForge (BaaS)
- **AI Model**: Claude Sonnet 4.5 (via InsForge AI SDK)

## 📁 Project Structure

```
src/
├── components/
│   ├── Scene/
│   │   ├── Scene.tsx              # Main Three.js canvas
│   │   ├── GlassNameCard.tsx      # 3D glass object
│   │   └── Lights.tsx             # Lighting setup
│   ├── Chat/
│   │   ├── ChatPanel.tsx          # Chat container
│   │   ├── MessageItem.tsx        # Message bubble
│   │   ├── InputArea.tsx          # Text input
│   │   └── TypingIndicator.tsx    # AI typing animation
│   └── Layout/
│       └── AppLayout.tsx          # Split-screen layout
├── stores/
│   └── sceneStore.ts              # Zustand state management
├── services/
│   ├── insforgeClient.ts          # InsForge SDK setup
│   └── aiService.ts               # AI integration logic
├── App.tsx                        # Main app component
└── main.tsx                       # Entry point
```

## 🎯 Key Design Decisions

1. **AI as Creative Partner**: Claude doesn't execute literal commands, it interprets creatively
2. **Smooth Transitions**: All scene updates use lerp interpolation for fluid animations
3. **Auto-rotate Camera**: Cinematic experience without user camera controls
4. **Side-by-side Layout**: Desktop-first design for optimal viewing
5. **localStorage Only**: No backend persistence needed, keeps it simple
6. **Streaming UI**: Shows AI typing, applies 3D changes when JSON is complete

## 🚧 Future Enhancements (Not Implemented)

- Export 3D object as GLTF
- Share links to designs
- Gallery of previous creations
- Voice input
- Mobile responsive layout
- More pattern types
- Camera position control via AI

## 📝 License

MIT

## 🙏 Credits

Built with:
- InsForge for backend infrastructure
- Anthropic Claude for AI creativity
- Three.js community for 3D tools
