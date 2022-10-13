import React from "react";
import classes from "./Paginator.module.css";


let Paginator = ({totalUsersCount,pageSize,onPageChanged,currentPage}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        if (i === 40) break;
    }
    return (
        <div>
            {pages.map(p => {
                return <span key={p.id} className={currentPage === p && classes.selectedPage}
                    onClick={(e) => { onPageChanged(p); }}> {p}</span>
            })}
        </div>
    )
}

export default Paginator