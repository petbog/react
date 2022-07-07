import React from 'react';
import classes from './ItemListInput.module.css';

const ItemListInput = (props) => {
    let Pas = () => {
        props.AddPost();
        props.updateNewPostText('');
    }

    let Input = React.createRef();

    let onPostChange = () =>{
        let PasInner = Input.current.value;
        props.updateNewPostText(PasInner);

    }

    return (
        <div className={classes.ItemListInput_item}>
            <form action="">
                <p className={classes.ItemListInput_text}>My posts</p>
                <textarea onChange={onPostChange} ref={Input} value= {props.newPostText} className={classes.ItemListInput_input} />
            </form>
            <button onClick={Pas} className={classes.ItemListInput_button}>Send</button>
        </div>
    )
}
export default ItemListInput;