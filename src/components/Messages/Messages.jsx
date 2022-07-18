import React from "react";
import classes from "./Messages.module.css";
import { Link } from 'react-router-dom';
import {updateNewMessageBody,sendMessageCreator} from '../../redux/messagesPage-reducer'

const DialogItem = (props) => {
    return (
        <p className={classes.Messages_name_inner}><Link to={'/messages/' + props.id}>{props.name}</Link></p>
    )
}

const DialogMessages = (props) => {
    return (
        <p className={classes.Messag_inner_text}>{props.text}</p>
    )
}

const Messages = (props) => {
    let state = props.store.getState().messagesPage
    let NewMessage = state.MessagesData
        .map(message => <DialogMessages text={message.message} />)


    let NewDialog = state.DialogsData
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    let NewMessageBody = state.DialogsData.NewMessageBody;


    let textInner = () => {
        props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.store.dispatch(updateNewMessageBody(body))
    }

    return (
        <div className={classes.Messages_inner}>
            {/* <h4 className="">Messages</h4> */}
            <div className={classes.Messages_name}>
                <div className={classes.Messages_name_box}>
                    {NewDialog}
                </div>
            </div>
            <div className={classes.Messag_inner}>
                <div className={classes.Messag_inner_box}>
                    {NewMessage}
                    <div className={classes.Messag_text}>
                        <div className={classes.Messag_text_box}>
                            <textarea value={NewMessageBody} onChange={onNewMessageChange}  className={classes.Messag_text_inner} placeholder="new message"></textarea>
                            <button onClick={textInner} className={classes.Messag_text_button}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;