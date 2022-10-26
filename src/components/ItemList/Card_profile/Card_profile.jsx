import React from 'react';
import { useState } from 'react';
import CardProfileInfoForm from './CardProfileInfoForm';
import classes from './Card_profile.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

//Object.keys(обьек) позволяет нам сделать итерацию по обьекту

const CardProfileInfo = ({ profile, isOwner, goToEditMode,saveProfile, ...props }) => {
    return (
        <div className={classes.CardProfileBox}>
            {isOwner && <div className=""><button onClick={goToEditMode}>edit</button></div>}
            <div className="">
                <div className="">
                    <b>Full name:</b>{profile.fullName}
                </div>
                <div className="">
                    <b>Looking for a job:</b>{profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {profile.lookingForAJob &&
                    <div className="">
                        <b>My professional skills:</b>{profile.lookingForAJobDescription}
                    </div>
                }
                <div className="">
                    <b>About me:</b>{profile.AboutMe}
                </div>
                <div className="">
                    <b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                    })}
                </div>
            </div>
        </div>
    )
}


const Contact = ({ contactTitle, contactValue }) => {
    return (<div className={classes.contact}><b>{contactTitle}:{contactValue}</b></div>

    )
}

const CardProfile = ({saveProfile,...props}) => {
    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        saveProfile(formData)
    }
    return (
        <div className="">
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            {editMode
                ? <CardProfileInfoForm  onSubmit={onSubmit}/>
                : <CardProfileInfo goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}
        </div>
    )
};

export default CardProfile;