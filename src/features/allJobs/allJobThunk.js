import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import authHeader from '../../utils/AuthHeader';




export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_,thunkAPI) => {

   const { page, search, searchStatus, searchType, sort } =thunkAPI.getState().allJobs;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

  if (search) {
    url = url + `&search=${search}`;
  }

    try {
      const resp = await customFetch.get(url,authHeader(thunkAPI));
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI)
    }
  }
);


export const showStats=createAsyncThunk('allJobs/showStates',async(_,thunkAPI)=>{
  try {
    const resp=await customFetch.get('/jobs/stats',authHeader(thunkAPI));
    return resp.data;
    
  } catch (error) {
   return checkForUnauthorizedResponse(error,thunkAPI)
  }
})
