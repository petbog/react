import React from "react";
import classes from './Login.module.css';
import { connect, useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { createField, Input } from "../common/preloader/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";


const MaxLength40 = maxLengthCreator(40)

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
   return (
      <div className="">
         <form onSubmit={handleSubmit}>

            {createField('Email', 'email', Input, [required, MaxLength40])}
            {createField('Password', 'password', Input, [required, MaxLength40], { type: 'password' })}
            {createField(null, 'remember me', Input, [], { type: "checkbox" }, 'remember me')}

            {error && <div className={classes.formSummaryError}>{error}</div>}
            <div className="">

               {captchaUrl && <img src={captchaUrl} alt="captchaUrl" />}
               {captchaUrl && createField('Simbols from imafe', 'captcha', Input, [required])}

               <button>Login</button>

            </div>
         </form>
      </div>
   )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)



export const Login = React.memo((props) => {
   const captchaUrl = useSelector(state => state.auth.captchaUrl)
   const isAuth = useSelector(state => state.auth.isAuth)

   const dispatch = useDispatch()

   const onSubmit = (formData) => {
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
   }
   if (isAuth) {
      return <Redirect to={'/ItemList'} />
   }
   return (
      <div className="">
         <h1>Login</h1>
         <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
      </div>
   )
})
