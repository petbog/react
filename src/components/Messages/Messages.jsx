import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import classes from "./Messages.module.css";
// import { Link } from 'react-router-dom';


const DialogItem = (props) => {
    return (
        // <p className={classes.Messages_name_inner}><Link to={'/messages/' + props.id}>{props.name}</Link></p>
        <p className={classes.Messages_name_inner}><NavLink to={'/messages/' + props.id}>{props.name}</NavLink></p>
    )
}

const DialogMessages = (props) => {
    return (
        <p className={classes.Messag_inner_text}>{props.text}</p>
    )
}

const Messages = (props) => {
    let state = props.messagesPage
    let NewMessage = state.MessagesData
        .map(message => <DialogMessages text={message.message} key={message.id} />)


    let NewDialog = state.DialogsData
        .map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />)
    let NewMessageBody = state.DialogsData.NewMessageBody;


    let textInner = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.updateNewPost(body)
    }
    if(!props.isAuth) return <Redirect to={'/login'}/>
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
                            <textarea value={NewMessageBody} onChange={onNewMessageChange} className={classes.Messag_text_inner} placeholder="new message"></textarea>
                            <button onClick={textInner} className={classes.Messag_text_button}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;