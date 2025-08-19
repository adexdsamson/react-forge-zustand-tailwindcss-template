/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Children,
  cloneElement,
  createElement,
  useImperativeHandle,
  useState,
} from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { ForgeProps } from "../types";
import {
  isButtonSlot,
  isElementSlot,
  isInputSlot,
  isNestedSlot,
  isReactNative,
  // isWeb,
} from "../utils";
import {
  getComponentType,
  getEventHandlerName,
  // mergePlatformProps,
  // REACT_NATIVE_COMPONENTS,
} from "../reactNative";
import { Forger } from "../Forger";
import { DevTool } from "@hookform/devtools";

export const Forge = <TFieldValues extends FieldValues = FieldValues>({
  className,
  children,
  onSubmit,
  control,
  ref,
  isNative,
  debug,
  platform = 'auto',
  isWizard = false,
}: ForgeProps<TFieldValues>) => {
  // Determine the actual platform to use
  const actualPlatform = platform === 'auto' 
    ? (isReactNative ? 'react-native' : 'web')
    : platform;
  
  const isRNMode = actualPlatform === 'react-native' || (isNative && isReactNative);
  
  // Wizard state management
  const [currentStep, setCurrentStep] = useState(0);
  const childrenArray = Children.toArray(children);
  const totalSteps = isWizard ? childrenArray.length : 0;
  
  // Wizard navigation handlers
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
  
  const handleWizardSubmit = () => {
    control.handleSubmit(onSubmit)();
  };
  
  // Recursive function to traverse and process the entire nested tree of children
  const processChildrenRecursively = (children: any, depth = 0): any => {
    // Prevent infinite recursion with a reasonable depth limit
    if (depth > 10) {
      return children;
    }

    return Children.map(children, (child) => {
      // Skip non-React elements (strings, numbers, null, undefined)
      if (!isElementSlot(child)) {
        return child;
      }

      // Handle button elements - attach form submit handler or wizard navigation
      if (isButtonSlot(child)) {
        const childProps = (child as any).props as any;
        const wizardNav = childProps['data-wizard-nav'];
        
        if (isWizard && wizardNav) {
          let onClick;
          let disabled = false;
          
          if (wizardNav === 'next') {
            if (currentStep === totalSteps - 1) {
              // Last step - submit form
              onClick = handleWizardSubmit;
            } else {
              // Navigate to next step
              onClick = handleNext;
            }
          } else if (wizardNav === 'previous') {
            onClick = handlePrevious;
            disabled = currentStep === 0;
          }
          
          return cloneElement(child, {
            ...childProps,
            onClick,
            disabled: disabled || childProps.disabled,
          } as any);
        }
        
        return cloneElement(child, {
          onClick: control.handleSubmit(onSubmit),
        } as any);
      }

      // Handle input elements in native/React Native mode - register with form control
      if (isInputSlot(child) && (isNative || isRNMode)) {
        const childProps = (child as any).props as any;
        const componentType = getComponentType(child);
        const eventHandlerName = getEventHandlerName(componentType);
        const registrationProps = control.register(childProps.name);
        
        // Merge platform-specific props
        const platformProps = isRNMode ? {
          [eventHandlerName]: registrationProps.onChange,
          onBlur: registrationProps.onBlur,
          ref: registrationProps.ref,
          name: registrationProps.name,
        } : registrationProps;
        
        return createElement((child as any).type, {
          ...childProps,
          ...platformProps,
          key: childProps.name,
        });
      }

      // Get child's children for recursive processing
      const childChildren = ((child as any).props as any)?.children;
      
      // If this element has children, process them recursively
      if (childChildren) {
        const processedChildren = processChildrenRecursively(childChildren, depth + 1);
        
        // For nested container elements (div, section, main), use createElement to preserve structure
        if (isNestedSlot(child)) {
          return createElement((child as any).type, {
            ...{
              ...((child as any).props as any),
              children: processedChildren,
            },
          });
        }
        
        // For other elements with children, clone and update
        return cloneElement(child, {
          ...{ control },
          children: processedChildren,
        } as any);
      }

      // For leaf elements without children, just pass control prop
      return cloneElement(child, { control } as any);
    });
  };

  // Process children based on wizard mode
  let updatedChildren;
  if (isWizard && childrenArray.length > 0) {
    // In wizard mode, only process and render the current step's child
    const currentChild = childrenArray[currentStep];
    updatedChildren = processChildrenRecursively(currentChild);
  } else {
    // Normal mode - process all children
    updatedChildren = processChildrenRecursively(children);
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        onSubmit: () => {
          control.handleSubmit(onSubmit)()
        },
      };
    },
    [onSubmit, control]
  );

  const renderFieldProps = control.hasFields
    ? control?.fields?.map((inputs, index) => (
        <Forger key={index} {...inputs} />
      ))
    : null;

  return (
    <FormProvider
      {...(control as unknown as any)}
      control={control as unknown as any}
    >
      <div className={className}>
        {renderFieldProps}
        {updatedChildren}
        {isWizard && (
          <div className="wizard-info" style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
            Step {currentStep + 1} of {totalSteps}
          </div>
        )}
      </div>
      {debug && <DevTool control={control} />}
    </FormProvider>
  );
};
