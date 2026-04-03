# Jobflix Design System & Architecture

## Overview
Jobflix (also known as Level-up) is designed with a modern, dynamic, and premium aesthetic. The user interface prioritizes visual excellence, utilizing fluid animations, a cohesive color palette, and micro-interactions that engage the user.

## Core Philosophical Principles
- **Rich Aesthetics**: A visually stunning first impression powered by vibrant colors, dark modes, glassmorphism, and dynamic animations.
- **Dynamic Interactions**: Micro-animations on hover and scroll states to make the interface feel responsive and alive.
- **Premium Feel**: Curated harmonious color palettes, modern typography, smooth gradients, and no generic default colors.

## Typography
- **Headings**: Bricolage (`var(--font-bricolage)`) — provides a distinct, bold, and modern look for user attention.
- **Body**: Geist Sans (`var(--font-geist-sans)`) — ensures smooth high readability and clean scaling for paragraphs.
- **Navigation**: Plus Jakarta (`var(--font-plus-jakarta)`) — used specifically for nav items.
- **Code**: Geist Mono (`var(--font-geist-mono)`).

## Color Palette & Theming
The application uses central design tokens (`src/lib/tokens.ts`) and global CSS properties for theme-aware elements.

### Brand Color
- **Primary Brand Color**: Emerald Green (`#10b981`)
- **Brand Variations**: Hover states (`#059669`), subtle backgrounds (`#ecfdf5`).

### Theme Colors (Light / Dark Mode)
- **Light Mode**: Clean white background (`#FFFFFF` or `oklch(1 0 0)`) with high-contrast text (`#1A1A1A`).
- **Dark Mode**: Deep immersive dark backgrounds (`#0A0A0A` or `oklch(0.09 0 0)`) contrasted with crisp, accessible white/light text.
- **Surfaces**: Light surface (`#F9FAFB`) and Dark surface (`#111113`) to support floating cards and overlays.

## Key Components

### Hero Section
- Features floating connected nodes (inspired by firecrawl.dev) that create an immediately engaging visual dynamic.
- Integrated `HeroBadge` to highlight primary calls to action or new features.

### World Map Component
- A high-fidelity, interactive World Map component.
- Used to showcase global reach, user distribution, or feature availability, enhancing the premium feel of the platform.

### Bento Grid
- A redesigned, content-rich Bento Grid structure.
- Displays the 7 core products/features of the company.
- Each feature card provides meaningful, visually appealing previews designed to capture attention and direct user flow.
- Features dynamic hover states and smooth transition animations.

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS & Vanilla CSS combined for maximum flexibility.
- Animations: Framer Motion / Aceternity UI components.
