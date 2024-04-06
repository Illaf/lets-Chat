import React,{useState} from 'react'
import Cookies from "universal-cookie";
import axios from 'axios';
const cookies= new Cookies();
const Auth = () => {
  const initialState={
fullName:'',
username:'',
phone:'',
avatarURL:'',
cpass:'',
password:''
  }
    const [signUp,setSignUp] = useState(true);
    const[form,setForm]= useState(initialState);

    const handleChange=(event)=>{
    //   setForm({
    //     ...form,
    //     [event.target.name]: event.target.value
    // });
     setForm({
      ...form, [event.target.name]:event.target.value
     })
    }
    const switchMode=()=>{
      setSignUp((prev)=> !prev)
    }
    const handleSubmit=async(e)=>{
e.preventDefault();
const {username, password,phone,avatarURL}=form;
const url= "http://localhost:5000/auth";
const {data:{token,userId,hashedPassword,fullName}}= await axios.post(`${url}/${signUp?'signup':'signin'}`,
{fullName:form.fullName,username,password,phone,avatarURL});
cookies.set('token',token);
cookies.set('username',username);
cookies.set('fullName',fullName);
cookies.set('userId',userId);
if(signUp){
  cookies.set('phone',phone);
  cookies.set('avatarURL',avatarURL);
  cookies.set('hashedPassword',hashedPassword);
}
window.location.reload();
    }
  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
            <p>{signUp?'Sign Up':'Sign in'}</p>
            <form action="" onSubmit={handleSubmit}>
                {signUp && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="fullName">Full Name</label> 
                         <input type="text" name="fullName" placeholder='Full Name' onChange={handleChange} required/>
                    </div>
                    
                )}
                <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="username">user Name</label> 
                         <input type="text" name="username" placeholder='user Name' onChange={handleChange} required/>
                    </div>
                    {signUp && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="phone">Phone number</label> 
                         <input type="text" name="phone" placeholder='Phone' onChange={handleChange} required/>
                    </div>
                    
                )}
                {signUp && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="avatarURL">avatarURL</label> 
                         <input type="text" name="avatarURL" placeholder='avatarURL' onChange={handleChange} required/>
                    </div>
                    
                )}
                {signUp && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="cpass">Confirm password</label> 
                         <input type="password" name="cpass" placeholder='Confirm password' onChange={handleChange} required/>
                    </div>
                    
                )}
                <div className='auth__form-container_fields-content_input'>
                        <label htmlFor="password">Password</label> 
                         <input type="password" name="password" placeholder='Password' onChange={handleChange} required/>
                    </div>
                    <div className='auth__form-container_fields-content_button'>
                      <button>{signUp?'Sign up':'Sign in'}</button>
                    </div>
                    <p>
                {signUp?'Already have an account':"Don't have an account"}
              </p>
              <span className='cursor-auto' onClick={switchMode}>{signUp?'Sign in':'Sign up'}</span>
            </form>
            
            
            
             </div>
      </div>
     
    </div>
  )
}

export default Auth
