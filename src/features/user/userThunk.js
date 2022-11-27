import { createAsyncThunk } from '@reduxjs/toolkit';
import authHeader from '../../utils/AuthHeader';
import customFetch from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';
import { checkForUnauthorizedResponse } from '../../utils/axios';


export const registerUser = createAsyncThunk('user/register', async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register',user);
      return resp.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
);

export const loginUser = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login',user);
      return resp.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
);


export const updateUser = createAsyncThunk('user/updateUser',async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/auth/updateUser', user,authHeader(thunkAPI));
      return resp.data;
    } catch (error) {

      return checkForUnauthorizedResponse(error,thunkAPI)

  
    }
  }


);


export const createJob = createAsyncThunk('job/createJob',async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post('/jobs', job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI)
    }
   
  }
);

export const clearStore=createAsyncThunk('user/clearStore',async(message,thunkAPI)=>{

  try {
    thunkAPI.dispatch(logoutUser(message))
    thunkAPI.dispatch(clearAllJobsState())
    thunkAPI.dispatch(clearValues())
    return Promise.resolve();

  } catch (error) {
    return Promise.reject;
  }
})
