# Debug Component Documentation

## Overview
The Debug component provides a collapsible, real-time state visualization panel for development and debugging purposes. It displays the current state of the application in a JSON-formatted view with syntax highlighting.

## Technical Specifications

### Component Structure
```jsx
Debug({ state })
```

### Props
| Prop | Type | Description |
|------|------|-------------|
| state | Object | The state object to display in the debug panel |

### State Management
- `isExpanded` (boolean): Controls the expanded/collapsed state of the debug panel
- Initial state is set to `true` (expanded)

### Layout System
The component uses a nested flexbox layout structure:
```
fixed container
└── flex container (main panel)
    ├── flex-none (header)
    │   └── button group
    └── flex-1 (content area)
        └── scrollable content
```

### CSS Classes
- Main container:
  - `fixed bottom-4 right-4 z-50`: Positions panel at bottom-right
  - `bg-gray-900/90 backdrop-blur-sm`: Semi-transparent background with blur
  - `transition-all duration-300`: Smooth animations

- Header section:
  - `flex-none`: Prevents header from shrinking
  - `border-b border-gray-800`: Visual separator

- Content section:
  - `flex-1 overflow-hidden`: Takes remaining space
  - `overflow-y-auto`: Enables vertical scrolling

### Dimensions
- Expanded state:
  - Width: 384px (w-96)
  - Height: 500px
- Collapsed state:
  - Width: 192px (w-48)
  - Height: 48px (h-12)

### Features
1. **Collapsible Panel**
   - Toggle button with chevron indicator
   - Smooth transition animations
   - Maintains state between toggles

2. **Console Integration**
   - "Clear Console" button
   - Integrates with browser's console.clear()

3. **Content Display**
   - JSON pretty-printing with 2-space indentation
   - Syntax highlighting for keys and values
   - Word wrapping for long content
   - Horizontal scrolling for wide content

### Performance Considerations
1. **Render Optimization**
   - Conditional rendering for expanded content
   - Uses CSS transforms for smooth animations
   - Minimal DOM updates during state changes

2. **Memory Management**
   - Content is unmounted when collapsed
   - Scrollable container prevents DOM bloat

### Browser Compatibility
- Uses modern CSS features:
  - Flexbox
  - CSS Grid
  - CSS Transitions
  - Backdrop filters
- Requires browser support for:
  - `position: fixed`
  - `backdrop-filter`
  - CSS Grid/Flexbox

### Usage Example
```jsx
import Debug from '@/Components/Animation/Debug';

function MyComponent() {
    const [myState, setMyState] = useState({});
    
    return (
        <div>
            <Debug state={myState} />
        </div>
    );
}
```

### Best Practices
1. **State Updates**
   - Keep state objects shallow for better performance
   - Avoid circular references in state objects
   - Use meaningful key names for better debugging

2. **Styling**
   - Use Tailwind classes for consistency
   - Maintain dark theme for better contrast
   - Keep transitions smooth for better UX

3. **Performance**
   - Limit state updates frequency
   - Use memoization for complex state objects
   - Consider disabling in production builds
