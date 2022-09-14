import React from "react"
import { Field, reduxForm} from "redux-form"

const LoginForm = (props) => {
   return (
      <div className="">
         <form onSubmit={props.handleSubmit}>
            <div className="">
               <Field placeholder={'Login'} component={'input'} name={'login'} />
            </div>
            <div className="">
               <Field placeholder={'Password'}  component={'input'}  name={'password'}/>
            </div>
            <div className="">
               <Field type={"checkbox"} component={'input'}  name={'rememberMe'}/> remember me
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
   const onSubmit=(FormData)=>{
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