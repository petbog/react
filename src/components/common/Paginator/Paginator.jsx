import React, { useState } from "react";
import classes from "./Paginator.module.css";


let Paginator = ({ totalUsersCount, pageSize, onPageChanged, currentPage, portionsSize = 10 }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        // if (i === 40) break;
    }

    let portionsCount = Math.ceil(pagesCount / portionsSize);
    let [portionsNumber, setPortionsNumber] = useState(1);
    let leftPortionsPageNumber = (portionsNumber - 1) * portionsSize + 1;
    let rightPortionsPageNumber = portionsNumber * portionsSize;


    return (
        <div>
            {portionsNumber > 1 &&
                <button onClick={() => { setPortionsNumber(portionsNumber - 1) }}> prev</button>}
            {pages
            .filter(p => p >= leftPortionsPageNumber && p<= rightPortionsPageNumber)
            .map(p => {
                return <span key={p.id} className={currentPage === p && classes.selectedPage}
                    onClick={(e) => { onPageChanged(p); }}> {p}</span>
            })}
            {
                portionsCount > portionsNumber &&
                <button onClick={() => { setPortionsNumber(portionsNumber + 1) }}>next</button>
            }
        </div>
    )
}

export default Paginator