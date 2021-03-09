import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserProfile, getUserStatus, updateStatus, savePhoto } from './../../redux/profileReducer';
import { Redirect, withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId;
            if(!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.userId != this.props.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} 
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getProfile: getUserProfile, getUserStatus, updateStatus, savePhoto}),
    withRouter,
)(ProfileContainer);

// let mapStateToPropsForRedirect = (state) => ({
//     isAuth: state.auth.isAuth
// });

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent); // create new Container Component

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent); // return new component profileContainer and put data from URL

// export default connect(mapStateToProps, {getProfile: getProfileThunkCreator})(WithUrlDataContainerComponent);