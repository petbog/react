import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValudatorType } from "../../../utils/validators/validators";
// @ts-ignore
import classes from './FormsControls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div >
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><textarea  {...input} {...restProps} /></FormControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><input  {...input} {...restProps} /></FormControl>
    )
}


export function createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType ,
    component: React.FC<WrappedFieldProps>,
    validate: Array<FieldValudatorType>, props = {}, text = '') {
    return <div>
        <Field placeholder={placeholder} component={component} validate={validate} name={name} {...props} /> {text}
    </div>
}
