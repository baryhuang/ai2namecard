# AI-Driven 3D Glass Namecard Generator

An interactive AI-powered 3D namecard generator that transforms conversational input into stunning visual designs.

## ✨ Features

- **AI-Powered Design**: Chat with Claude Sonnet 4.5 to describe your creative vision
- **3D Glass Namecard**: Semi-transparent glass material with realistic reflections and shadows
- **Dark Space Environment**: Futuristic black background with floor shadows
- **Smooth Animations**: Gentle floating and limited rotation (-30° to +30°)
- **Pattern System**: Grid, particles, waves, and circuit patterns
- **Real-time Updates**: See your design evolve as the AI interprets your input
- **Persistent State**: Chat history and scene saved to localStorage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- InsForge account with API key

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
```

## 🎮 How to Use

1. The app starts with a default "HELLO - AI Powered" glass card
2. Type creative prompts in the chat:
   - "Make it feel like a sunset"
   - "Add my name: Alex"
   - "Give it cyberpunk vibes"
   - "Calm ocean feeling"

3. Watch the AI creatively interpret your vision and update the 3D scene

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **Backend**: InsForge (BaaS)
- **AI**: Claude Sonnet 4.5

## 📁 Project Structure

```
src/
├── components/
│   ├── Scene/          # Three.js 3D components
│   ├── Chat/           # Chat interface
│   └── Layout/         # App layout
├── stores/             # Zustand state management
└── services/           # InsForge & AI integration
```

## 📄 License

MIT

## 🙏 Credits

Built with InsForge, Claude AI, and Three.js

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
