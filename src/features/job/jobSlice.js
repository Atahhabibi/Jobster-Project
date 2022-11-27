import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { editJob,deleteJob,createJob } from './JobThunk';


const initialState={
  isLoading:false,
  position:'',
  company:'',
  jobLocation:'',
  jobTypeOptions:['full-time','part-time','remote','internship'],
  jobType:'full-time',
  statusOptions:['interview','declined','pending'],
  status:'pending',
  isEditing:false,
  editJObId:'',

}

const jobSlice=createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange:(state,{payload:{name,value}})=>{
            state[name]=value;
        },

        clearValues:(state)=>{
            return {...initialState,jobLocation:getUserFromLocalStorage()?.location||''}
        },
        setEditJob:(state,{payload})=>{
          return {...state,isEditing:true,...payload}
        }
    },

   extraReducers: {

    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Job Created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]:(state,{ payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: ({ payload }) => {
      toast.error(payload);
    },[createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      toast.success('Job modified');
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

   }
})
export const {handleChange,clearValues,setEditJob} =jobSlice.actions;
export default jobSlice.reducer;