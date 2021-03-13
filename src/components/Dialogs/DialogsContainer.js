import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from './../../redux/dialogsReducer';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
  return {
      dialogsPage: state.dialogsPage,
      // isAuth: state.auth.isAuth // not need because we get it in withAuthRedirect
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onSendMessageClick: (newMessageBody) => {
          dispatch(actions.sendMessageCreator(newMessageBody))
      },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
)(Dialogs);

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default DialogsContainer;
  