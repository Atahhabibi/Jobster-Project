import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import { clearValues} from '../../features/job/jobSlice';
import { createJob,editJob } from '../../features/job/JobThunk';
import { useEffect } from 'react';
import { handleChange } from '../../features/job/jobSlice';



const AddJob = () => {
  const {user}=useSelector((store)=>store.user)

  useEffect(() => {
   if(!isEditing){
    dispatch(handleChange({name:'jobLocation',value:user.location}))
   }
  }, [])

  const {isLoading,position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions, isEditing, editJobId,} = useSelector((store) => store.job);
  const dispatch=useDispatch();

 const handleSubmit=(e)=>{
  e.preventDefault();

  if(!position||!jobLocation||!company){
    toast.error('Please Fill Out All the fields');
    return;
  }

  if(isEditing){
    dispatch(editJob({jobId:editJobId,job:{position, company, jobLocation, jobType, jobTypeOptions, status}}))
    return;
  }

  dispatch(createJob({jobLocation,jobType,status,company,position}))

}

const handleJobInput=(e)=>{
 const name=e.target.name;
 const value=e.target.value;

 dispatch(handleChange({name,value}))
 
}


  return <Wrapper>

    <form className='form'>

      <h3>{isEditing?'edit Job':'add job'}</h3>

      <div className="form-center">

        <FormRow type="text" name="position" handleChange={handleJobInput} value={position}/>
        <FormRow type="text" name="company" handleChange={handleJobInput} value={company}/>
        <FormRow type="text" name="jobLocation" handleChange={handleJobInput} value={jobLocation} labelText="Job location"/>

        <FormRowSelect labelText='job type' list={jobTypeOptions} name='jobType' handleChange={handleJobInput} value={jobType}/>
        <FormRowSelect labelText='status' list={statusOptions} name='status' handleChange={handleJobInput} value={status}/>

        <div className="btn-container">
          <button className="btn btn-block clear-btn" type='button' onClick={()=>dispatch(clearValues())}>Clear</button>
          <button className="btn btn-block submit-btn" type='button' onClick={handleSubmit} disabled={isLoading}>Submit</button>
        </div>




      </div>


    </form>

  </Wrapper>
  
}

export default AddJob