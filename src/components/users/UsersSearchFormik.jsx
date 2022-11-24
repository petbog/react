import React from "react";
import { Field, Form, Formik } from "formik";


const UsersSearchFormikValidate = (values) => {
    const errors = {};
    return errors;
}

export const UsersSearchForm = React.memo((props) => {
    const Submit = (values, { setSubmitting }) => {
        const filter ={
            term :values.term,
            friend:values.friend === "null" ? null :values.friend === "true" ? true : false
        }
        props.OnFilterChanget(filter)
        setSubmitting(false)
    }

    return (
        <div className="">
            <Formik
                initialValues={{ term: '', friend: null }}
                validate={UsersSearchFormikValidate}
                onSubmit={Submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only onfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})


export default UsersSearchForm;