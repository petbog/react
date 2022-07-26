import React from 'react';
import CardProfile from './Card_profile/Card_profile';
import Comment from './Comments/Comment';
import classes from './ItemList.module.css';
import {addPostActionCreated,UpdateNewPostTextActionCreated } from '../../redux/profilePage-reducer'



const ItemList = (props) => {


    let Post = props.posts
        .map(p => <Comment comment={p.message} />)

    let Pas = () => {
        props.dispatch(addPostActionCreated());
    }

    let Input = React.createRef();
    let onPostChange = () => {
        let PasInner = Input.current.value;
        props.dispatch(UpdateNewPostTextActionCreated(PasInner));

    }

    return (
        <div className="">
            <div className={classes.item_list}>
                <div >
                    <img src="https://lapkins.ru/upload/iblock/130/1309222f033fb6928ea065578276ab44.jpg" alt="" className={classes.item_list_img} />
                </div>
                <div className="">
                    <CardProfile />
                </div>
            </div>
            <div className={classes.ItemListInput_item}>
                <form action="">
                    <p className={classes.ItemListInput_text}>My posts</p>
                    <textarea onChange={onPostChange} ref={Input} value={props.newPostText} className={classes.ItemListInput_input} />
                </form>
                <button onClick={Pas} className={classes.ItemListInput_button}>Send</button>
            </div>
            {Post}
        </div>
    )
}


export default ItemList;