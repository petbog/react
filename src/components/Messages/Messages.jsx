import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
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


const addMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.Messag_text_box}>
                <Field component={'textarea'} placeholder={"new message"} name={'NewMessageBody'} />
                <button className={classes.Messag_text_button}>Отправить</button>
            </div>
        </form>
    )
}

const MessagesReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(addMessageForm)

const Messages = (props) => {
    let state = props.messagesPage
    let NewMessage = state.MessagesData
        .map(message => <DialogMessages text={message.message} key={message.id} />)

    debugger;
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
                    {NewMessage}
                    <div className={classes.Messag_text}>
                    </div>
                </div>
                <MessagesReduxForm onSubmit={addNewMessag} />
            </div>
        </div>
    )
}




export default Messages;