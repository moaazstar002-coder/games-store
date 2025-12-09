# Styling Guide

Complete reference for the GameZone design system.

---

## CSS Variables

**File:** `src/styles/theme.css`

### Colors

```css
--bg-dark: #050505; /* Main background */
--bg-card: #121212; /* Card background */
--primary: #00f2ea; /* Cyan */
--secondary: #ff0055; /* Pink */
--accent: #7000ff; /* Purple */
--text-main: #ffffff; /* Main text */
--text-muted: #a0a0a0; /* Muted text */
```

### Gradients

```css
--gradient-main: linear-gradient(135deg, #050505 0%, #1a1a2e 100%);
--gradient-glass: linear-gradient(
  145deg,
  rgba(255, 255, 255, 0.05) 0%,
  rgba(255, 255, 255, 0.01) 100%
);
--gradient-btn: linear-gradient(90deg, var(--primary), var(--accent));
--gradient-btn-hover: linear-gradient(90deg, var(--accent), var(--primary));
```

### Shadows & Glows

```css
--shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
--glow-primary: 0 0 20px rgba(0, 242, 234, 0.3);
--glow-secondary: 0 0 20px rgba(255, 0, 85, 0.3);
--glow-text: 0 0 10px rgba(255, 255, 255, 0.5);
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
```

### Layout

```css
--container-width: 1400px;
--header-height: 80px;
```

### Transitions

```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## Utility Classes

### Glass Effects

**Glass Panel:**

```css
.glass-panel {
  background: rgba(20, 20, 25, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Glass Card:**

```css
.glass-card {
  background: var(--gradient-glass);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-card);
}
```

**Usage:**

```jsx
<div className="glass-panel">
  <h2>Content</h2>
</div>
```

---

## Typography

### Font Family

```css
font-family: "Rajdhani", "Outfit", sans-serif;
```

### Headings

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1 {
  font-size: 3.5rem;
}
h2 {
  font-size: 2.5rem;
}
h3 {
  font-size: 1.75rem;
}
```

---

## Common Patterns

### Neon Button

```css
.neon-button {
  background: var(--gradient-btn);
  color: #000;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  box-shadow: var(--glow-primary);
  transition: var(--transition-normal);
}

.neon-button:hover {
  background: var(--gradient-btn-hover);
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 242, 234, 0.5);
}
```

### Card Hover Effect

```css
.game-card {
  transition: var(--transition-normal);
}

.game-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 242, 234, 0.2);
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
}

/* Tablet */
@media (max-width: 768px) {
}

/* Desktop */
@media (min-width: 1024px) {
}
```

---

## Animations

### Fade In Up

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
```

### Glow Pulse

```css
@keyframes glow-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 10px rgba(0, 242, 234, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(112, 0, 255, 0.7));
  }
}
```

---

## Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
```

---

## Best Practices

1. **Use CSS Variables** - Always use theme variables for consistency
2. **Glassmorphism** - Apply `.glass-panel` or `.glass-card` for modern effects
3. **Transitions** - Use predefined transition timings
4. **Responsive** - Design mobile-first
5. **Accessibility** - Maintain contrast ratios

---

**[← Back to README](../README.md)**
