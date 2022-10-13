import React from "react";
import classes from './Login.module.css';
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { createField, Input } from "../common/preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";


const MaxLength40 = maxLengthCreator(40)

const LoginForm = ({ handleSubmit, error }) => {
   return (
      <div className="">
         <form onSubmit={handleSubmit}>

            {createField('Email', 'email', Input, [required, MaxLength40])}
            {/* <Field placeholder={'Email'} component={Input} validate={[required, MaxLength40]} name={'email'} /> */}

            {createField('Password', 'password', Input, [required, MaxLength40], { type: 'password' })}
            {/* <Field placeholder={'Password'} component={Input} validate={[required, MaxLength40]} name={'password'} type={'password'} /> */}

            {createField(null, 'remember me', Input, [], {type:"checkbox"},'remember me')}
            {/* <Field type={"checkbox"} component={Input} validate={[required, MaxLength40]} name={'rememberMe'} /> remember me */}

            {error && <div className={classes.formSummaryError}>{error}</div>}
            <div className="">
               <button>Login</button>
            </div>
         </form>
      </div>
   )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
   const onSubmit = (formData) => {
      props.login(formData.email, formData.password, formData.rememberMe);
   }
   if (props.isAuth) {
      return <Redirect to={'/ItemList'} />
   }
   return (
      <div className="">
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit} />
      </div>
   )
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login);