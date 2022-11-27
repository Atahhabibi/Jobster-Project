import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobs,showStats } from './allJobThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};


const initialState = {
  isLoading:false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};





const allJobsSlice=createSlice({
  name:'allJobs',
  initialState,

  reducers:{
   showLoading:(state)=>{
       state.isLoading=true;
   },
   hideLoading:(state)=>{
       state.isLoading=false;
   },

   handleChange:(state,{payload:{name,value}})=>{
    state.page=1;
    state[name]=value;
   },
   
   clearFilter:(state)=>{
    return {...state,...initialFiltersState}
   },

   changePage:(state,{payload})=>{
    state.page=payload;
   },

   clearAllJobsState:(state)=>initialState

  },

 extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
      state.numOfPages=payload.numOfPages;
      state.totalJobs=payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats= payload.defaultStats;
      state.monthlyApplications= payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
}

  
})

export const {showLoading,hideLoading,handleChange,clearFilter,changePage,clearAllJobsState}=allJobsSlice.actions;
export default  allJobsSlice.reducer;