import React from "react";
// @ts-ignore
import classes from './Login.module.css';
import { connect } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";


const MaxLength40 = maxLengthCreator(40)


type LoginFormOnProps = {
   captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOnProps> & LoginFormOnProps> = ({ handleSubmit, error, captchaUrl }) => {
   return (
      <div className="">
         <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesTypeKey>('Email', 'email', Input, [required, MaxLength40])}
            {createField<LoginFormValuesTypeKey>('Password', 'password', Input, [required, MaxLength40], { type: 'password' })}
            {createField<LoginFormValuesTypeKey>(undefined, 'rememberMe', Input, [], { type: "checkbox" }, 'remember me')}

            {error && <div className={classes.formSummaryError}>{error}</div>}
            <div className="">

               {captchaUrl && <img src={captchaUrl} alt="captchaUrl" />}
               {captchaUrl && createField<LoginFormValuesTypeKey>('Simbols from imafe', 'captcha', Input, [required])}

               <button>Login</button>

            </div>
         </form>
      </div>
   )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOnProps>({ form: 'login' })(LoginForm)


type MapStatePropsType = {
   captchaUrl: string | null
   isAuth: boolean
}

type MapDispatchToProps = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string
}

// keyof копирует ключи и мы их подставляем вместо названия createField и этим типизируется форма
type LoginFormValuesTypeKey = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchToProps> = (props) => {
   const onSubmit = (formData: LoginFormValuesType) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
   }
   if (props.isAuth) {
      return <Redirect to={'/ItemList'} />
   }
   return (
      <div className="">
         <h1>Login</h1>
         <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
      </div>
   )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
   captchaUrl: state.auth.captchaUrl,
   isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login);