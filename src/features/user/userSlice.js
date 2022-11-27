import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addUserToLocalStorage, getUserFromLocalStorage,removeUserFromLocalStorage} from '../../utils/localStorage';

import { updateUser, loginUser, registerUser, clearStore } from './userThunk';

const initialState = {
  isLoading: false,
  isSidebarOpen:false,
  user: getUserFromLocalStorage(),
};


const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers:{
    toggleSidebar:(state)=>{
     state.isSidebarOpen=!state.isSidebarOpen
    },

    logoutUser:(state,{payload})=>{
     state.user=null;
     state.isSidebarOpen=false;
     removeUserFromLocalStorage();

     if(payload){
      toast.success(payload)
     }

    }


  },

  extraReducers:{
    [registerUser.pending]:(state)=>{
      state.isLoading=true;
    },
    [registerUser.fulfilled]:(state,{payload})=>{
      const {user}=payload;
      state.isLoading=false;
      state.user=user;
      toast.success(`Hello dear ${user.name}`)
      addUserToLocalStorage(user)
    },
    
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },


    [loginUser.pending]:(state)=>{
      state.isLoading=true;
    },
    
    [loginUser.fulfilled]:(state,{payload})=>{
      const {user}=payload;
      state.isLoading=false;
      state.user=user;
      toast.success(`Welcome back ${user.name}`)
      addUserToLocalStorage(user)
    },

    [loginUser.rejected]:(state,{payload})=>{
      state.isLoading=false;
      toast.error(payload)
    },

    [updateUser.pending]:(state)=>{
      state.isLoading=true;
    },

    [updateUser.fulfilled]:(state,{payload})=>{
      const {user}=payload;
      state.isLoading=false;
      state.user=user;
      toast.success(`User Updated`)
      addUserToLocalStorage(user)
    },

    [updateUser.rejected]:(state,{payload})=>{
      state.isLoading=false;
      toast.error(payload)
    },

    [clearStore.rejected]:()=>{
      toast.error("There was an error....")
    }

  }


});

export const  {toggleSidebar,logoutUser}=userSlice.actions;

export default userSlice.reducer;