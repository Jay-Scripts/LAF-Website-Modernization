# Frontend UI Rules

Use this file as the UI/UX instruction source for this project.

## Design Taste

- Use the installed `frontend-design` skill as the taste baseline.
- Design with intention, not template defaults.
- Keep the UI warm, polished, responsive, and specific to Little Ark Foundation.
- Preserve finalized content and wording unless explicitly asked to change copy.
- Avoid AI-looking defaults: oversized rounded cards everywhere, random gradient blobs, generic feature grids, excessive glass blur, and decorative elements that do not support the content.

## Stack

- Use Next.js app patterns already present in the project.
- Use Tailwind CSS utilities for styling.
- Use shadcn/ui components when a matching component exists.
- Use Lucide icons instead of custom inline SVG icons when possible.
- Avoid raw CSS unless the effect cannot be expressed cleanly with Tailwind or existing component patterns.
- Do not add new UI libraries unless explicitly approved.

## Mobile First

- Base classes should target mobile first.
- Add larger viewport refinements with responsive Tailwind prefixes like `sm:`, `md:`, and `lg:`.
- Test layouts mentally and practically at:
  - 375px mobile
  - 768px tablet
  - 1280px desktop
- Text, buttons, cards, and images must not overflow or overlap.
- Use 2-column mobile grids only when content remains readable; otherwise stack naturally.

## Section Height

- Hero sections may use `min-h-[100dvh]` for an immersive first screen.
- Do not force every section to `100dvh` on mobile.
- Content sections can use desktop full-screen rhythm, but mobile should use natural height:

```tsx
<section className="min-h-[100dvh] py-[clamp(76px,8vw,110px)] max-[767px]:min-h-0 max-[767px]:py-14">
```

- Final CTA sections can be shorter on mobile, for example:

```tsx
<section className="min-h-[88dvh] max-[767px]:min-h-[62dvh]">
```

## Typography

- Use `clamp()` for major responsive text.
- Keep mobile headings compact enough to avoid stacked, cramped screens.
- Avoid viewport-only font scaling.
- Use `leading` values intentionally:
  - Hero headings: tight but readable.
  - Body copy: comfortable, usually `leading-[1.4]` to `leading-[1.6]`.
- Use `text-balance` only when it improves heading wrapping.

## Components

- Prefer existing components before creating new ones.
- Keep component changes scoped and readable.
- Use shadcn/ui components through `className` extension.
- Cards should generally use restrained radii like `rounded-lg`.
- Avoid nested cards unless the layout truly needs a framed component inside another framed component.
- Buttons should have clear touch targets, ideally at least 44px tall on mobile.

## Tailwind CSS

- Prefer Tailwind utilities for spacing, layout, color, typography, effects, and responsive behavior.
- Keep class names readable and consistent with nearby code.
- Avoid hardcoded one-off CSS files for simple styling.
- Use project colors and established visual language before inventing new palettes.

## Animation

- Use CSS-native transitions first:
  - `transition`
  - `duration-300`
  - `ease-out`
  - `hover:-translate-y-1`
  - opacity/transform reveals
- Respect reduced motion:

```tsx
className="transition duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none"
```

- Use Framer Motion only if it is already installed or explicitly approved for the task.
- Do not add Framer Motion for simple hover, reveal, or fade effects.
- Animation should make the interface feel smoother, not busier.

## Images

- Use real project assets when available.
- Use `next/image` for important images when practical.
- Provide stable dimensions or aspect ratios to avoid layout shift.
- Avoid dark, vague, overly cropped, or decorative-only imagery when the user needs to understand the real subject.

## Accessibility

- Keep touch targets usable on mobile.
- Preserve keyboard focus states.
- Maintain readable contrast.
- Do not hide important content behind hover-only interactions.
- Respect `prefers-reduced-motion`.

## Pre-Ship Checklist

- Mobile layout checked at 375px.
- Tablet layout checked at 768px.
- Desktop layout checked at 1280px or wider.
- No horizontal overflow.
- No text overlap.
- Buttons are not oversized or cramped.
- Cards feel balanced and not overly rounded.
- Content wording is unchanged unless requested.
- `npm.cmd run lint` passes or only has known unrelated warnings.
- `npm.cmd run build` passes.
