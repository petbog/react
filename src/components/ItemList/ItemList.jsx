import React from 'react';
import CardProfile from './Card_profile/Card_profile';
import Comment from './Comments/Comment';
import classes from './ItemList.module.css';
import Preloader from '../common/preloader/preloader'
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../utils/validators/validators';
import { Textarea } from '../common/preloader/FormsControls/FormsControls';
import user from "../../assets/images/user.png";


const maxLength10 =maxLengthCreator(10)

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.ItemListInput_item}>
            <p className={classes.ItemListInput_text}>My posts</p>
            <Field placeholder={'new post'} component={Textarea} name={'newPostText'} validate={[required,maxLength10]} className={classes.ItemListInput_input} />
            <button className={classes.ItemListInput_button}>Send</button>
        </form>
    )
}


let PostReduxForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

const ItemList = (props) => {
    let Post = props.posts
        .map(p => <Comment comment={p.message} key={p.id} />)


    if (!props.profile) {
        return <Preloader />
    }
    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }
     const onMainPhotoSelected=(e)=>{
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }
    //isOwner проверяет мой ли профиль и делает показ книпки
    return (
        <div className="">
            <div className={classes.item_list}>
                <div className={classes.userPhoto}>
                    <img src={props.profile.photos.large  || user} alt='' />
                    {props.isOwner && <input onChange={onMainPhotoSelected} type={"file"} />}
                </div>
                <div className="">
                    <CardProfile saveProfile={props.saveProfile} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
                </div>
            </div>
            <PostReduxForm onSubmit={onAddPost} />
            {Post}
        </div>
    )
}



export default ItemList;