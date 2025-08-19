# Forge Wizard Functionality

The Forge component has been enhanced with wizard form functionality that allows you to create multi-step forms with navigation controls.

## Overview

When the `isWizard` prop is set to `true`, the Forge component transforms into a wizard-driven form that:

1. Renders only one child component at a time
2. Provides navigation between steps
3. Manages the current step state internally
4. Handles form submission on the final step

## Usage

### Basic Wizard Setup

```tsx
import { Forge, useForge } from '../lib/forge';

const MyWizardForm = () => {
  const { control } = useForge({
    defaultValues: {
      step1Field: '',
      step2Field: '',
      step3Field: ''
    }
  });

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <Forge
      control={control}
      onSubmit={handleSubmit}
      isWizard={true}
      className="wizard-container"
    >
      {/* Step 1 */}
      <div>
        <h3>Step 1: Personal Information</h3>
        <input name="step1Field" type="text" placeholder="Name" />
        <button data-wizard-nav="previous">Previous</button>
        <button data-wizard-nav="next">Next</button>
      </div>

      {/* Step 2 */}
      <div>
        <h3>Step 2: Contact Information</h3>
        <input name="step2Field" type="email" placeholder="Email" />
        <button data-wizard-nav="previous">Previous</button>
        <button data-wizard-nav="next">Next</button>
      </div>

      {/* Step 3 */}
      <div>
        <h3>Step 3: Additional Details</h3>
        <textarea name="step3Field" placeholder="Comments" />
        <button data-wizard-nav="previous">Previous</button>
        <button data-wizard-nav="next">Submit</button>
      </div>
    </Forge>
  );
};
```

## Props

### New Prop: `isWizard`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When set to `true`, enables wizard mode for the form

## Navigation Controls

Navigation buttons are identified using the `data-wizard-nav` attribute:

### `data-wizard-nav="next"`

- Advances to the next step
- On the final step, submits the form instead
- Button text can be customized (e.g., "Next", "Continue", "Submit")

### `data-wizard-nav="previous"`

- Goes back to the previous step
- Automatically disabled on the first step
- Button text can be customized (e.g., "Previous", "Back")

## Features

### Step Management

- **Current Step Tracking**: Internal state manages which step is currently active
- **Step Counter**: Displays "Step X of Y" information at the bottom
- **Edge Case Handling**: 
  - Previous button is disabled on the first step
  - Next button becomes Submit on the last step

### Child Component Rendering

- Only the current step's child component is rendered
- All other steps are hidden from the DOM
- Form data is preserved across all steps

### Form Submission

- Form validation and submission work the same as regular Forge forms
- All form data from all steps is submitted together
- The `onSubmit` callback receives the complete form data

## Example Implementation

A complete working example is available at:
- **File**: `src/demo/WizardExample.tsx`
- **Route**: `/dashboard/wizard` (when logged in)

## Technical Implementation

### State Management

```tsx
const [currentStep, setCurrentStep] = useState(0);
const childrenArray = Children.toArray(children);
const totalSteps = isWizard ? childrenArray.length : 0;
```

### Navigation Handlers

```tsx
const handleNext = () => {
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
  }
};

const handlePrevious = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};
```

### Button Processing

The component automatically detects navigation buttons and attaches appropriate handlers:

```tsx
if (isWizard && wizardNav) {
  let onClick;
  let disabled = false;
  
  if (wizardNav === 'next') {
    if (currentStep === totalSteps - 1) {
      onClick = handleWizardSubmit; // Submit on last step
    } else {
      onClick = handleNext; // Navigate to next step
    }
  } else if (wizardNav === 'previous') {
    onClick = handlePrevious;
    disabled = currentStep === 0; // Disable on first step
  }
}
```

## Best Practices

1. **Consistent Navigation**: Include both Previous and Next buttons on each step for better UX
2. **Clear Step Indicators**: Use descriptive headings for each step
3. **Form Validation**: Consider adding step-by-step validation before allowing navigation
4. **Responsive Design**: Ensure wizard works well on mobile devices
5. **Progress Indication**: The built-in step counter helps users understand their progress

## Compatibility

- Works with all existing Forge features
- Compatible with React Native mode
- Supports all form validation and control features
- Can be used with custom styling and themes

## Migration

Existing Forge forms are not affected by this change. The wizard functionality is opt-in via the `isWizard` prop.