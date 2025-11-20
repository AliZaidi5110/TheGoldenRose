# Technical Stack

## Build System

- **Build Tool**: Vite 5.x
- **Package Manager**: npm
- **Node Version**: 16+ required

## Frontend Framework

- **React**: 18.2.0
- **React Router DOM**: 6.22.0 (for client-side routing)

## Styling

- **Tailwind CSS**: 3.4.1
- **PostCSS**: 8.4.35
- **Autoprefixer**: 10.4.17

## Development Tools

- **@vitejs/plugin-react**: 4.2.1
- **ESM Modules**: Project uses ES modules (type: "module")

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:5173)
```

### Production
```bash
npm run build       # Build for production (outputs to dist/)
npm run preview     # Preview production build locally
```

## Project Configuration

- **Vite Config**: `vite.config.js` - React plugin configuration
- **Tailwind Config**: `tailwind.config.js` - Custom color palette (golden, forest)
- **PostCSS Config**: `postcss.config.js` - Tailwind and Autoprefixer setup

## Code Style

- Use functional components with hooks
- ES6+ syntax (arrow functions, destructuring, template literals)
- Component-based architecture
- Smooth scroll behavior enabled globally
