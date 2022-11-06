import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import classes from "./Messages.module.css";


const DialogItem = (props) => {
    return (
        <p className={classes.Messages_name_inner}><NavLink to={'/messages/' + props.id}>{props.name}</NavLink></p>
    )
}

const DialogMessages = (props) => {
    return (
        <p className={classes.Messag_inner_text}>{props.text}</p>
    )
}
const MaxLength40 = maxLengthCreator(40)

const addMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.Messag_text_box}>
                <Field component={Textarea} validate={[required, MaxLength40]} placeholder={"new message"} name={'NewMessageBody'} />
                <button className={classes.Messag_text_button}>Отправить</button>
            </div>
        </form>
    )
}

const MessagesReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(addMessageForm)

const Messages = (props) => {
    let state = props.messagesPage
    let NewMessage = state.MessagesData
        .map(message => <DialogMessages text={message.message} key={message.key} />)

    let NewDialog = state.DialogsData
        .map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />)


    let addNewMessag = (values) => {
        props.sendMessage(values.NewMessageBody)
    }
    return (
        <div className={classes.Messages_inner}>
            <div className={classes.Messages_name}>
                <div className={classes.Messages_name_box}>
                    {NewDialog}
                </div>
            </div>
            <div className={classes.Messag_inner}>
                <div className={classes.Messag_inner_box}>
                    <div className={classes.Messag_text}>
                        {NewMessage}
                    </div>
                </div>
                <MessagesReduxForm onSubmit={addNewMessag} />
            </div>
        </div>
    )
}




export default Messages;