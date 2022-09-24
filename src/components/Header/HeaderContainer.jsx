import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setUserData,getAuthUserData,logout } from '../../redux/auth-reducer'


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
        // authAPI.me()
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             let { email, id, login } = response.data.data;
        //             this.props.setUserData(email, id, login);
        //         }
        //     });
    }

    render() {
        return <Header {...this.props} />
    }
}
let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, { setUserData,getAuthUserData,logout })(HeaderContainer);