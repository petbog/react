import React from 'react';
import classes from './ItemListInput.module.css';

const ItemListInput = (props) => {
    let Pas = () => {
        props.dispatch({ type: 'ADD-POST' });
        props.updateNewPostText('');
    }

    let Input = React.createRef();
    let onPostChange = () => {
        debugger;
        let PasInner = Input.current.value;
        props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', NewText: PasInner });

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