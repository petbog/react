import React from "react";
import { Field } from "redux-form";
import classes from './FormsControls.module.css'

const FormControl = ({ input, meta:{touched,error}, child, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : '')}>
            <div >
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}><textarea  {...input} {...restProps} /></FormControl>
    )
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return (
        <FormControl {...props}><input  {...input} {...restProps} /></FormControl>
    )
}

export const createField = (placeholder, name, component, validate, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder} component={component} validate={validate} name={name} {...props} /> {text}
    </div>
)
