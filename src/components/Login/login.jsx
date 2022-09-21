import React from "react"
import { Field, reduxForm } from "redux-form"
import { Input } from "../common/preloader/FormsControls/FormsControls"
import { maxLengthCreator, required } from "../utils/validators/validators"


const MaxLength20 = maxLengthCreator(20)

const LoginForm = (props) => {
   return (
      <div className="">
         <form onSubmit={props.handleSubmit}>
            <div className="">
               <Field placeholder={'Login'} component={Input} validate={[required, MaxLength20]} name={'login'} />
            </div>
            <div className="">
               <Field placeholder={'Password'} component={Input} validate={[required, MaxLength20]} name={'password'} />
            </div>
            <div className="">
               <Field type={"checkbox"} component={Input} validate={[required, MaxLength20]} name={'rememberMe'} /> remember me
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
   const onSubmit = (FormData) => {
      console.log(FormData);
   }
   return (
      <div className="">
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit} />
      </div>
   )
}

export default Login