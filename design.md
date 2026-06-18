# Design Guidelines

## Aesthetic
- Elegant dark UI with refined details
- Monochrome icons (currentColor) over branded colored icons
- Subtle hover interactions (scale, transitions)

## Component Patterns

### DetailInfo
- Grid-based layout (`grid grid-cols-[auto_1fr]`) for label/value pairs
- Optional `fullWidth` prop for items spanning full width (e.g., overview text)

### Section
- Optional `header` prop renders inline with title via `flex items-center gap-4`
- Used for placing controls (like selects) beside section titles

### Media Grid
- `border-t border-input pt-4` separators between media sections
- Images use `hover:scale-105 transition-transform duration-300`

### Thumbnails (Video/Photo)
- `overflow-hidden rounded-lg group` on container
- `group-hover:scale-105 transition-transform` on image
- Ensures smooth scale without overflow

### Empty States
- Dedicated `EmptyState` component for missing posters/images
- Consistent styling with centered content

### Search Combobox
- 40x40px poster thumbnails for search results
- Debounced search (300ms, min 2 chars)
- Shows first 5 results from first page only
- Select navigates to media detail, Enter navigates to search page

### Share Buttons
- Inline SVGs with monochrome styling
- `hover:scale-105` with `duration-300` transitions
- Reduced bundle size vs react-share icons

## Icons
- Primary: `lucide-react`
- Consistent monochrome approach throughout

## Animations
- Transition duration: 300ms standard
- Scale on hover: 105% for images/thumbnails
- Scale on hover: 110% for buttons
