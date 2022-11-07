import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from './Card_profile.module.css';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    let activateEditMode = () => {
        setEditMode(true);
    };

    let deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    };
    //на случай типизации e
    // let onStatusChange=(e:ChangeEvent<HTMLInputElement>)=>{ 
    //     setStatus(e.currentTarget.value);
    // }


    let onStatusChange=(e)=>{
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={classes.status__box}>
            {!editMode &&
                <div className="">
                    <b>Status:</b><div className="" onDoubleClick={activateEditMode}>{props.status || "No Status"}</div>
                </div>
            }
            {editMode &&
                < div className="">
                    <input type="text" onChange={onStatusChange} onBlur={deActivateEditMode} autoFocus={true} value={status} />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;