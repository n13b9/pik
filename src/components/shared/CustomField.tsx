import React from 'react'
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from './TransformationsForm';



type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
};

export const CustomField = ({
    control,
    render,
    name,
    formLabel,
    className,
  }: CustomFieldProps) =>{
    return (
      <div className={className}>
      {formLabel && <label>{formLabel}</label>}
     
      
    </div>
    )
}