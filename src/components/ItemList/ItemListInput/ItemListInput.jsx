import React from 'react';
import classes from './ItemListInput.module.css';
import {addPostActionCreated, UpdateNewPostTextActionCreated} from '../../../redux/profilePage-reducer'


const ItemListInput = (props) => {
    let Pas = () => {
        props.dispatch(addPostActionCreated());
    }

    let Input = React.createRef();
    let onPostChange = () => {
        let PasInner = Input.current.value;
        props.dispatch(UpdateNewPostTextActionCreated(PasInner));

    }

    return (
        <div className={classes.ItemListInput_item}>
            <form action="">
                <p className={classes.ItemListInput_text}>My posts</p>
                <textarea onChange={onPostChange} ref={Input} value={props.newPostText} className={classes.ItemListInput_input} />
            </form>
            <button onClick={Pas} className={classes.ItemListInput_button}>Send</button>
        </div>
    )
}
export default ItemListInput;