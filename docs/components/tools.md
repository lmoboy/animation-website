# Tools Configuration Documentation

## Overview
The tools.js file serves as the central configuration hub for all animation properties, settings, and options available in the animation system. It defines the structure and constraints for various animation properties that can be applied using anime.js.

## Technical Specifications

### Configuration Structure

#### Base Configuration
```javascript
{
    properties: {
        transform: TransformConfig,
        color: ColorConfig,
        timing: TimingConfig,
        easing: EasingConfig
    }
}
```

### Property Configurations

#### 1. Transform Configuration
```javascript
const TransformConfig = {
    scale: {
        x: { min: 0, max: 10, step: 0.1 },
        y: { min: 0, max: 10, step: 0.1 },
        z: { min: 0, max: 10, step: 0.1 }
    },
    skew: {
        x: { min: -180, max: 180, step: 1 },
        y: { min: -180, max: 180, step: 1 }
    },
    rotate: {
        x: { min: -360, max: 360, step: 1 },
        y: { min: -360, max: 360, step: 1 },
        z: { min: -360, max: 360, step: 1 }
    },
    translate: {
        x: { min: -1000, max: 1000, step: 1 },
        y: { min: -1000, max: 1000, step: 1 },
        z: { min: -1000, max: 1000, step: 1 }
    }
}
```

#### 2. Color Configuration
```javascript
const ColorConfig = {
    backgroundColor: {
        type: 'color',
        format: 'rgba'
    },
    borderColor: {
        type: 'color',
        format: 'rgba'
    },
    textColor: {
        type: 'color',
        format: 'rgba'
    },
    opacity: {
        min: 0,
        max: 1,
        step: 0.01
    }
}
```

#### 3. Timing Configuration
```javascript
const TimingConfig = {
    duration: {
        min: 0,
        max: 10000,
        step: 100,
        default: 1000
    },
    delay: {
        min: 0,
        max: 5000,
        step: 100,
        default: 0
    },
    endDelay: {
        min: 0,
        max: 5000,
        step: 100,
        default: 0
    },
    loop: {
        type: 'boolean',
        default: false
    },
    direction: {
        type: 'select',
        options: ['normal', 'reverse', 'alternate']
    }
}
```

#### 4. Easing Configuration
```javascript
const EasingConfig = {
    type: 'select',
    options: [
        'linear',
        'easeInQuad',
        'easeOutQuad',
        'easeInOutQuad',
        'spring(mass, stiffness, damping, velocity)',
        'elastic(mass, stiffness, damping, velocity)'
    ],
    custom: {
        spring: {
            mass: { min: 1, max: 100, step: 1 },
            stiffness: { min: 1, max: 1000, step: 1 },
            damping: { min: 1, max: 100, step: 1 },
            velocity: { min: 0, max: 100, step: 1 }
        },
        elastic: {
            mass: { min: 1, max: 100, step: 1 },
            stiffness: { min: 1, max: 1000, step: 1 },
            damping: { min: 1, max: 100, step: 1 },
            velocity: { min: 0, max: 100, step: 1 }
        }
    }
}
```

### Value Types and Constraints

#### 1. Numeric Values
- Defined with min/max ranges
- Specific step increments
- Optional default values

#### 2. Color Values
- Supports RGB/RGBA formats
- Hex color codes
- Named colors

#### 3. Boolean Values
- Simple true/false toggles
- Used for features like loop

#### 4. Select Values
- Predefined options
- Custom configurations for specific options

### Integration with anime.js

#### Property Mapping
```javascript
const animePropertyMap = {
    scale: 'scale',
    rotate: 'rotate',
    translateX: 'translate.x',
    backgroundColor: 'backgroundColor',
    // ... other mappings
};
```

### Validation Functions

#### 1. Range Validation
```javascript
function validateRange(value, config) {
    return value >= config.min && value <= config.max;
}
```

#### 2. Type Validation
```javascript
function validateType(value, config) {
    switch(config.type) {
        case 'color':
            return isValidColor(value);
        case 'select':
            return config.options.includes(value);
        // ... other type validations
    }
}
```

### Usage Examples

#### 1. Basic Property Access
```javascript
const scaleConfig = tools.properties.transform.scale;
const maxScale = scaleConfig.x.max; // 10
```

#### 2. Easing Configuration
```javascript
const easingOptions = tools.properties.easing.options;
const springConfig = tools.properties.easing.custom.spring;
```

### Best Practices

1. **Configuration Updates**
   - Keep configurations in sync with anime.js capabilities
   - Document new properties thoroughly
   - Maintain backward compatibility

2. **Value Constraints**
   - Use reasonable min/max ranges
   - Choose appropriate step values
   - Provide sensible defaults

3. **Performance**
   - Keep configuration objects flat when possible
   - Use efficient validation methods
   - Cache computed values when appropriate

### Type Definitions
```typescript
interface PropertyConfig {
    min?: number;
    max?: number;
    step?: number;
    default?: any;
    type?: string;
    options?: string[];
    format?: string;
    custom?: Record<string, any>;
}

interface ToolsConfig {
    properties: {
        transform: Record<string, PropertyConfig>;
        color: Record<string, PropertyConfig>;
        timing: Record<string, PropertyConfig>;
        easing: PropertyConfig;
    };
}
```
