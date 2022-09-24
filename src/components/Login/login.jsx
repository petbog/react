import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Input } from "../common/preloader/FormsControls/FormsControls"
import { maxLengthCreator, required } from "../utils/validators/validators"
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router-dom"


const MaxLength40 = maxLengthCreator(40)

const LoginForm = (props) => {
   return (
      <div className="">
         <form onSubmit={props.handleSubmit}>
            <div className="">
               <Field placeholder={'Email'} component={Input} validate={[required, MaxLength40]} name={'email'} />
            </div>
            <div className="">
               <Field placeholder={'Password'} component={Input} validate={[required, MaxLength40]} name={'password'} type={'password'} />
            </div>
            <div className="">
               <Field type={"checkbox"} component={Input} validate={[required, MaxLength40]} name={'rememberMe'} /> remember me
            </div>
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
   isAuth:state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login);