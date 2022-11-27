import { useState,useEffect } from "react"
import { Logo,FormRow } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  loginUser, registerUser  } from "../features/user/userThunk";

const intitialState={
    name:'',
    email:'', 
    password:'',
    isMember:false,

}

const Register = () => {

    const navigate=useNavigate();
    const[values,setValues]=useState(intitialState);
    const { isLoading, user } = useSelector((store) => store.user);
    const dispatch=useDispatch();

     useEffect(()=>{
      if(user){
        setTimeout(() => {
          navigate('/');
        },2000);
      }
    },[user]) 

 const handleChange=(e)=>{
  
    const name=e.target.name;
    const value=e.target.value;
    setValues({...values,[name]:value})
 }


 const handleSubmit=(e)=>{
     e.preventDefault();

     const {name,email,password,isMember}=values;
      if (!email || !password || (!isMember && !name)){
        toast.error('Please Fill Out All Fields')
        return ;
      }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
   
     dispatch(registerUser({ name, email, password }));
  
    }

    const toggleMember=()=>{
      setValues({...values,isMember:!values.isMember})
    }



 return <Wrapper className="full-page">

    <form className="form" onSubmit={handleSubmit}>

        <Logo/>
       <h3>{values.isMember?'Login':'Register'}</h3>
       {!values.isMember &&<FormRow type='text' name='name' value={values.name} handleChange={handleChange} labelText="Name"/>} 
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} labelText="Email"/>
        <FormRow type='text' name='password' value={values.password} handleChange={handleChange} labelText="Password"/>

        <button type="submit" className="btn btn-block" disabled={isLoading}>{isLoading?'loading...':'Submit'}</button>
        <button type="button" className="btn btn-block btn-hipster" onClick={()=>{dispatch(loginUser({email:'testUser@test.com',password:'secret'}))}} disabled={isLoading}>{isLoading?'loading...':'demo'}</button>
        <p>{values.isMember?'Not member yet?':'Already Member ?'}<button type="button" onClick={toggleMember} className='member-btn'>{!values.isMember?'Login':'Register'}</button></p>

    </form>


 </Wrapper>
}

export default Register