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
    return (
        <div className={classes.Messages_inner}>
            {/* <h4 className="">Messages</h4> */}
            <div className={classes.Messages_name}>
                <div className={classes.Messages_name_box}>
                    <DialogItem name='Андрей' id='1' />
                    <DialogItem name='Иван' id='2' />
                    <DialogItem name='Костя' id='3' />
                    <DialogItem name='Настя' id='4' />
                    <DialogItem name='Вероника' id='5' />
                </div>
            </div>
            <div className={classes.Messag_inner}>
                <div className={classes.Messag_inner_box}>
                    <DialogMessages text='Привет' />
                    <DialogMessages text='Как дела?' />
                    <DialogMessages text='Что делаешь?' />
                </div>
            </div>
        </div>
    )
}

export default Messages;