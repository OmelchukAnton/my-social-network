import React, {useEffect} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UsersSearchForms from "./UsersSearchForm";
import {FilterType, getUsersThunkCreator} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";

type PropsType = {
}

export const Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
    }, [dispatch, currentPage, pageSize, filter]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    }

    const follow = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(follow(userId));
    }

    return <div>
        <UsersSearchForms onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {users.map(u => <User user={u}
                                  followingInProgress={followingInProgress}
                                  key={u.id}
                                  unfollow={unfollow}
                                  follow={follow}/>)}
        </div>
    </div>
}
