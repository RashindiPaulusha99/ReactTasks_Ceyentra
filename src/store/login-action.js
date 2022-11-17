import {createSlice} from '@reduxjs/toolkit';

const loginAction = createSlice({
    name: 'login',
    initialState: {
        data: [],
    },
    reducers:{
        login(state, action){
            
        },
        
    }
});

export const login_Actions = loginAction.actions;

export default loginAction;