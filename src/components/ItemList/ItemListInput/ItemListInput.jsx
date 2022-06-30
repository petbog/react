import React from 'react';
import classes from './ItemListInput.module.css';

const ItemListInput = (props) => {
    let Pas = () => {
        let PasInner = Input.current.value;
        props.AddPost(PasInner);
        Input.current.value ='';
    }

    let Input = React.createRef();

    return (
        <div className={classes.ItemListInput_item}>
            <form action="">
                <p className={classes.ItemListInput_text}>My posts</p>
                <label htmlFor="" className="">
                    <input ref={Input} type="form" className={classes.ItemListInput_input} />
                </label>
            </form>
            <button onClick={Pas} className={classes.ItemListInput_button}>Send</button>
        </div>
    )
}
export default ItemListInput;