import React from 'react';
import CardProfile from './Card_profile/Card_profile';
import Comment from './Comments/Comment';
import classes from './ItemList.module.css';
import ItemListInput from './ItemListInput/ItemListInput';

const ItemList = () => {
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
                <ItemListInput />
                <Comment comment ='Пойду поем'/>
                <Comment comment ='теперь поспать'/>
        </div>
    )
}


export default ItemList;