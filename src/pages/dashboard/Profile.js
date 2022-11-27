import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userThunk';

const Profile = () => {
  
  const {user,isLoading}=useSelector((store)=>store.user);
  const disptach=useDispatch();

  const[userData,setUserData]=useState({
    name:user?.name||'',
    email:user?.email||'',
    lastName:user?.lastName||'',
    location:user?.location||''
  });


  const handleSubmit=(e)=>{
    e.preventDefault();

    const {name,location,email,lastName}=userData;

    if(!name||!location||!email||!lastName){
      toast.error('Please Fill Out All Fields');
      return ;
    }

    disptach(updateUser(userData))
  }


  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUserData({...userData,[name]:value})
  }

  return  <Wrapper>

    <form  className="form" onSubmit={handleSubmit}>
      <h3>profile</h3>

      <div className="form-center">

        <FormRow type='text' handleChange={handleChange} name='name' value={userData.name} />
        <FormRow type='email' handleChange={handleChange} name='email' value={userData.email} />
        <FormRow type='text' handleChange={handleChange} name='location' value={userData.location} />
        <FormRow type='text' handleChange={handleChange} name='lastName' value={userData.lastName} />
        <button className='btn btn-block' type='submit' disabled={isLoading}>{isLoading?'Please wait...':'save changes'}</button>

      </div>



    </form>




  </Wrapper>
  
}

export default Profile