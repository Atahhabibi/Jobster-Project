import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange,clearFilter } from '../features/allJobs/allJobsSlice';
import { useState,useMemo } from 'react';


const SearchContainer = () => {
  const[localSearch,setLocalSearch]=useState('');

  const {isLoading,search,searchStatus,searchType,sort,sortOptions}=useSelector((store)=>store.allJobs);
  const {jobTypeOptions,statusOptions}=useSelector((store)=>store.job);
  const dispatch=useDispatch();

 const handleSearch=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  dispatch(handleChange({name,value}))
 }

 const handleSubmit=(e)=>{
  e.preventDefault();
  dispatch(clearFilter())
 }


 const debounce=()=>{
   let timeoutID;

   return (e)=>{
    setLocalSearch(e.target.value);
    clearTimeout(timeoutID);

    timeoutID=setTimeout(() => {
      dispatch(handleChange({name:e.target.name,value:e.target.value}))
    },1000);

    }
 }

 const optimizedDebounce=useMemo(()=>debounce(),[])



  return <Wrapper>

    <form  className="form">
      <h4>search form</h4>
      <div className="form-center">

        <FormRow type='text' name='search' value={localSearch} labelText="Search" handleChange={optimizedDebounce}/>
        <FormRowSelect  name='searchStatus' value={searchStatus} labelText="Status" handleChange={handleSearch} list={['all',...statusOptions]}/>
        <FormRowSelect  name='searchType' value={searchType} labelText="Type" handleChange={handleSearch} list={['all',...jobTypeOptions]}/>
        <FormRowSelect  name='sort' value={sort} labelText="sort" handleChange={handleSearch} list={sortOptions}/>
        <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>clear filter</button>

      </div>

    </form>


  </Wrapper>
  
}

export default SearchContainer