import React from 'react';
import classes from './Card_profile.module.css';

const CardProfileInfo = (props) => {
    return (
        <div className={classes.CardProfileBox}>
            <img src="" alt="" />
            <div className="">
                <h5 className="">{props.name}</h5>
                <p className="">{props.date}</p>
                <p className="">{props.city}</p>
            </div>
        </div>
    )
}

const CardProfile = () => {
    return (
        <CardProfileInfo name='Petrov Bogdan' date='Date of Birth : 18 February' city='rostov-on-don' />
    )
};

export default CardProfile;