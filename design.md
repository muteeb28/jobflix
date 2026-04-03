# Jobflix Design System & Architecture

## Overview
Jobflix (also known as Level-up) is designed with a modern, dynamic, and premium aesthetic. The user interface prioritizes visual excellence, utilizing fluid animations, a cohesive color palette, and micro-interactions that engage the user.

## Core Philosophical Principles
- **Rich Aesthetics**: A visually stunning first impression powered by vibrant colors, dark modes, glassmorphism, and dynamic animations.
- **Dynamic Interactions**: Micro-animations on hover and scroll states to make the interface feel responsive and alive.
- **Premium Feel**: Curated harmonious color palettes, modern typography, smooth gradients, and no generic default colors.

## Typography
- **Headings**: Sora (provides a distinct, bold, and modern look for titles and large text).
- **Body**: DM Sans (ensures high readability and clean scaling for paragraphs and smaller UI text).

## Color Palette & Theming
The application supports a robust Light/Dark mode toggle with theme-aware styling. 
Tokens are managed centrally to ensure consistency across the application.
- Theme swapping seamlessly transitions between light and dark modes without jarring the user.
- Deep, immersive dark mode backgrounds contrasted with crisp, accessible text.

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
