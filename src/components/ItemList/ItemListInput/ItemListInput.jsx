import React from 'react';
import classes from './ItemListInput.module.css';

const ItemListInput = () =>{
    return (
        <div className={classes.ItemListInput_item}>
            <form action="">
                <p className={classes.ItemListInput_text}>My posts</p>
                <label htmlFor="" className="">
                    <input type="form" className={classes.ItemListInput_input} />
                </label>
            </form>
                <button className={classes.ItemListInput_button}>Send</button>
        </div>
    )
}
export default ItemListInput;