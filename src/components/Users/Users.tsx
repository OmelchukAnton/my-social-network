import React from 'react';
import { UserType } from '../../types/Types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
        currentPage: number 
        totalUsersCount: number
        pageSize: number 
        onPageChanged: (pageNumber: number) => void
        users: Array<UserType>
        followingInProgress: Array<Number>
        unfollow: (userId: number) => void
        follow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
    return <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                       totalItemsCount={totalUsersCount} pageSize={pageSize} />
            {users.map(u => <User key={u.id} 
                                    user={u} 
                                    followingInProgress={props.followingInProgress} 
                                    unfollow={props.unfollow} 
                                    follow={props.follow} />)}
        </div>;

}

export default Users;