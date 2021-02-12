import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProfileThunkCreator, getUserStatus, updateStatus } from './../../redux/profileReducer';
import { Redirect, withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose(
    connect(mapStateToProps, {getProfile: getProfileThunkCreator, getUserStatus, updateStatus}),
    withRouter,
)(ProfileContainer);

// let mapStateToPropsForRedirect = (state) => ({
//     isAuth: state.auth.isAuth
// });

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent); // create new Container Component

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent); // return new component profileContainer and put data from URL

// export default connect(mapStateToProps, {getProfile: getProfileThunkCreator})(WithUrlDataContainerComponent);