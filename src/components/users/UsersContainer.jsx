import React from "react";
import Preloader from "../common/preloader/preloader";
import {getIsFetching } from "../../redux/Users-selected";
import { Users } from './Users';
import { useSelector } from "react-redux";



export const UserPage = React.memo((props) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users/>
        </>
    )
})
