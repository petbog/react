import React from "react";
import classes from "./Messages.module.css";
import { Link } from 'react-router-dom';

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

    let NewMessage = props.state.MessagesData
        .map(message => <DialogMessages text={message.message} />)


    let NewDialog = props.state.DialogsData
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)

    let textInner = () => {
        let textData = text.current.value;
        alert(textData)
    }
    let text = React.createRef()

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
                </div>
                <div className={classes.Messag_text}>
                    <div className={classes.Messag_text_box}>
                        <textarea ref={text} className={classes.Messag_text_inner} name="" id="" cols="30" rows="10"></textarea>
                        <button onClick={textInner} className={classes.Messag_text_button}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;