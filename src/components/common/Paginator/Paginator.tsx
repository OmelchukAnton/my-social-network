import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from "classnames";

type PropsType = {
    totalItemsCount: number 
    pageSize: number
    currentPage: number 
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<Number> = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalItemsCount / pageSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return (
        <div className={cn(styles.paginator, {
            [styles.selectedPage] : true
        })}>
            { portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1)}}>PREV</button>}
            { pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, key) => {
                return <span key={key} 
                            onClick={() => { 
                                onPageChanged(p) 
                            }} 
                            className={ cn({ [styles.selectedPage] : currentPage === p }, styles.pageNumber)}>{p}
                        </span>
            })}
            { portionCount > portionNumber && 
            <button onClick={() => { setPortionNumber(portionNumber + 1)}}>NEXT</button>}
        </div>
    )
}

export default Paginator;