import customFetch from '../../utils/axios';
import { showLoading, hideLoading } from '../allJobs/allJobsSlice';
import { getAllJobs } from '../allJobs/allJobThunk';
import { clearValues } from './jobSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser } from '../user/userSlice';
import authHeader from '../../utils/AuthHeader';
import { checkForUnauthorizedResponse } from '../../utils/axios';

export const createJob = createAsyncThunk('job/createJob',async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post('/jobs', job,authHeader(thunkAPI));
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
     return checkForUnauthorizedResponse(error,thunkAPI)

    }
  }
);


export const deleteJob=createAsyncThunk('job/deleteJOb',async(jobId,thunkAPI)=>{
  thunkAPI.dispatch(showLoading());
  try {
    const resp=await customFetch.delete(`/jobs/${jobId}`,authHeader(thunkAPI))

    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
    
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error,thunkAPI)
    
  }
});


export const editJob=createAsyncThunk('job/editJob',async({jobId,job},thunkAPI)=>{

  try {
    const resp=await customFetch.patch(`/jobs/${jobId}`,job,authHeader(thunkAPI))

    thunkAPI.dispatch(clearValues());
    return resp.data;
    
  } catch (error) {
     return checkForUnauthorizedResponse(error,thunkAPI)
    
  }
});


