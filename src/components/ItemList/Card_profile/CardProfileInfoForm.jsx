import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/preloader/FormsControls/FormsControls";
import classes from './Card_profile.module.css';

const CardProfileInfoForm = ({ profile, isOwner, goToEditMode, handleSubmit, ...props }) => {
    return (
        <form className={classes.CardProfileBox} onSubmit={ handleSubmit}>
            <div className=""><button >edit</button></div>
            <div className="">
                <div className="">
                    <b>Full name:</b>{createField("Full name", "FullName", Input, [])}
                </div>
                <div className="">
                    <b>Looking for a job:</b> {createField("", "lookingForAJob", Input, [], { type: 'checkbox' })}
                </div>
                {<div className="">
                    <b>My professional skills:</b>{createField("My professional skills", "lookingForAJobDescription", Textarea, [])}
                </div>
                }
                <div className="">
                    <b>About me:</b> {createField("About Me", "AboutMe", Textarea, [])}
                    
                </div>
                {/* <div className="">
                    <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                </div> */}
            </div>
        </form>
    )
}

const CardProfileInfoFormReduxForm = reduxForm({ form: 'edit-profile' })(CardProfileInfoForm)

export default CardProfileInfoFormReduxForm;