# Sacred Grounds Shop - Trade Skills Demo

A fantasy-themed web application demonstrating a trade skills workflow system for a game. This example app showcases the "Mining > Open a Mine" feature with a full user interface and game mechanics.

## Features

- **Modern Dark Fantasy Theme**: High-contrast dark UI with fantasy aesthetics
- **Complete Mining Workflow**: Multi-screen guided process for opening mines
- **Dynamic Calculations**: Real-time skill point costs, effective levels, and time calculations
- **Validation System**: Comprehensive form validation with helpful error messages
- **Probability Engine**: Weighted random mine type generation based on skill level
- **Responsive Design**: Works on desktop and mobile devices
- **Embeddable**: Self-contained CSS prevents style leakage when embedded

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **GitHub Pages** - Deployment

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/example-trade-skill-app.git
cd example-trade-skill-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── TextField.tsx
│   ├── Select.tsx
│   ├── ToggleSwitch.tsx
│   ├── Header.tsx
│   ├── InfoPanel.tsx
│   ├── ValueBox.tsx
│   ├── MineCard.tsx
│   └── Loading.tsx
├── screens/          # Main workflow screens
│   ├── HomeScreen.tsx
│   ├── MiningSelectionScreen.tsx
│   ├── EventPlayerInfoScreen.tsx
│   ├── MiningSkillModifiersScreen.tsx
│   └── MineCardResultScreen.tsx
├── utils/            # Business logic
│   ├── validation.ts      # Form validation
│   ├── calculations.ts    # Game calculations
│   └── probabilities.ts   # Random generation
├── types/            # TypeScript interfaces
│   └── index.ts
├── styles/           # Global styles
│   └── globals.css
├── App.tsx           # Main app with state management
└── main.tsx          # Entry point
```

## How It Works

### Workflow Overview

1. **Home Screen**: Select from available trade skills (only Mining is enabled)
2. **Mining Selection**: Choose between "Open a Mine" or "Use a Mine" (only Open is enabled)
3. **Event & Player Info**: Enter event code and player number with validation
4. **Mining Skill & Modifiers**: Select skill level and apply modifiers
5. **Loading**: Brief animation while generating results
6. **Mine Card Result**: Display generated mine card with all details

### Game Mechanics

#### Skill Points Cost
- Base: `Mining Skill × 2`
- Efficient Worker: `-3` (minimum 1)
- Inefficient Worker: `+3`

#### Effective Mine Level
- Base: Mining Skill (1-10)
- Modified by bonuses/penalties
- Clamped to 1-10 range

#### Time to Open
- Default: 15 minutes
- Fast Worker: 10 minutes
- Slow Worker: 20 minutes

#### Mine Type Generation
- Based on effective skill level (1-10)
- Weighted probability tables for each level
- Higher skills unlock rare materials (Voidsteel, Voidstone at level 10)

#### Modifier Incompatibilities
The following modifier groups are mutually exclusive:
1. Fast Worker ⚔ Slow Worker
2. Efficient Worker ⚔ Inefficient Worker
3. Misc Bonus +2, +1 ⚔ Misc Penalty -1, -2
4. Event Bonus +1 ⚔ Event Penalty -1

## Deployment

### GitHub Pages

The app automatically deploys to GitHub Pages when you push to the `main` branch.

#### Setup Instructions

1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under **Source**, select "GitHub Actions"
4. Push to main branch to trigger deployment

The app will be available at: `https://YOUR_USERNAME.github.io/example-trade-skill-app/`

### Manual Deployment

Build the production bundle:
```bash
npm run build
```

The output will be in the `dist/` directory, ready to deploy to any static hosting service.

## Embedding

To embed this app in another site using an iframe:

```html
<iframe
  src="https://YOUR_USERNAME.github.io/example-trade-skill-app/"
  width="100%"
  height="800"
  frameborder="0"
  title="Sacred Grounds Shop"
></iframe>
```

The app uses CSS Modules to ensure styles don't leak into the parent page.

## Customization

### Changing the Base Path

If deploying to a different path, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-custom-path/',
  // ...
})
```

### Modifying Colors

Edit CSS variables in `src/styles/globals.css`:

```css
:root {
  --color-bg-primary: #1a1a1a;
  --color-accent-primary: #8b5cf6;
  /* ... */
}
```

### Adding New Skills

To enable other skills, modify `src/screens/HomeScreen.tsx` and implement their workflows following the Mining pattern.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

This is an example project for demonstration purposes.

## Contributing

This is a demonstration project, but feedback and suggestions are welcome via issues.

---

Built with React, TypeScript, and Vite for demonstration purposes.
