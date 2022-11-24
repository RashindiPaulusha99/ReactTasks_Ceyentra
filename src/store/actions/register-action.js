import {createSlice} from '@reduxjs/toolkit';

const registerAction = createSlice({
    name: 'register',
    initialState: {
        user: [],
    },
    reducers:{
        register(state, action){
            const newId = action.payload;
           
            const existingId = state.user.find((userDetails) => userDetails.id === newId.id);
            
            if(!existingId){
                state.user.push({
                    id: newId.id,
                    name: newId.name,
                    email: newId.email,
                    password: newId.password,
                });
            }
        }, 
    }

});

export const register_Actions = registerAction.actions;

export default registerAction;