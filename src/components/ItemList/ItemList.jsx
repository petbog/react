import React from 'react';
import CardProfile from './Card_profile/Card_profile';
import Comment from './Comments/Comment';
import classes from './ItemList.module.css';
import Preloader from '../common/preloader/preloader'



const ItemList = (props) => {
    let Post = props.posts
        .map(p => <Comment comment={p.message} key={p.id} />)

    let Pas = () => {
        props.addPost()
    }

    let Input = React.createRef();

    let onPostChange = () => {
        let PasInner = Input.current.value;
        props.UpdateNewPostText(PasInner)

    }

    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className="">
            <div className={classes.item_list}>
                <div className="">
                    <img src={props.profile.photos.large} alt='' />
                </div>
                <div className="">
                    <CardProfile status={props.status} updateStatus={props.updateStatus} />
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