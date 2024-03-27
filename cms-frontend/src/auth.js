import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        UserData : null,
        ScoreData : null,
        RespData : null
    },
    reducers: {
        setUserData: (state,action) =>{
            state.UserData = action.payload
        },
        clearUserData : (state)=>{
            state.UserData = null
        },
        setScoreData : (state,action) =>{
            state.ScoreData = action.payload
        },
        clearScoreData : (state)=>{
            state.ScoreData = null
        },
        setRespData : (state,action) =>{
            state.RespData = action.payload
        },
        clearRespData : (state)=>{
            state.RespData = null
        }
    }
})

export const {setUserData,clearUserData,setScoreData,setRespData,clearRespData,clearScoreData} = authSlice.actions

export const selectUserData = (state) => state.auth.UserData
export const selectScoreData = (state) => state.auth.ScoreData
export const selectRespData = (state) => state.auth.RespData


export default authSlice.reducer