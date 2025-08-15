import React, { createContext, useId } from 'react'
import { InputField } from './Input'
// import { Label } from "./Label";
// import { Textarea } from "./Textarea";
// import { DatePicker } from "./DatePicker";
import { CheckboxField } from './Checkbox'
import { RadioField } from './Radio'
import { SelectField } from './Select'
export type { SelectOption } from './Select'
// import { Phone } from "./Phone";

export const FieldContext = createContext<string | undefined>(undefined)

export interface FieldComposition extends React.HTMLAttributes<HTMLDivElement> {
  //   Label: typeof Label;
  Input: typeof InputField
  //   Textarea: typeof Textarea;
  Checkbox: typeof CheckboxField
  Radio: typeof RadioField
  Select: typeof SelectField
  //   Phone: typeof Phone;
  //   Date: typeof DatePicker;
}

export const Field: React.FC<{
  children: React.ReactNode
  className?: string
}> &
  FieldComposition = ({ children, className = 'mb-5.5', ...props }) => {
  const id = useId()

  return (
    <FieldContext.Provider value={id}>
      <div className={className} {...props}>
        {children}
      </div>
    </FieldContext.Provider>
  )
}

// Field.Label = Label;
Field.Input = InputField
// Field.Textarea = Textarea;
Field.Checkbox = CheckboxField
Field.Radio = RadioField
Field.Select = SelectField
// Field.Phone = Phone;
// Field.Date = DatePicker;
