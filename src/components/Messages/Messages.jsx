import React from "react";
import classes from "./Messages.module.css";
import { Link } from 'react-router-dom';

const DialogItem = (props) => {
    return (
        <p className={classes.Messages_name_inner}><Link to={'/messages/' + props.id} >{props.name}</Link></p>
    )
}

const DialogMessages = (props) => {
    return (
        <p className={classes.Messag_inner_text}>{props.text}</p>
    )
}

let DialogsData = [
    { id: 1, name: 'Андрей' },
    { id: 2, name: 'Иван' },
    { id: 3, name: 'Костя' },
    { id: 4, name: 'Настя' },
    { id: 5, name: 'Вероника' },
]
let MessagesData = [
    { id: 1, message: 'Привет' },
    { id: 2, message: 'Как дела?' },
    { id: 3, message: 'Что делаешь?' },
]

const Messages = (props) => {
    return (
        <div className={classes.Messages_inner}>
            {/* <h4 className="">Messages</h4> */}
            <div className={classes.Messages_name}>
                <div className={classes.Messages_name_box}>
                    <DialogItem name={DialogsData[0].name} id={DialogsData[0].id} />
                </div>
            </div>
            <div className={classes.Messag_inner}>
                <div className={classes.Messag_inner_box}>
                    <DialogMessages text={MessagesData[0].message} />
                </div>
            </div>
        </div>
    )
}

export default Messages;