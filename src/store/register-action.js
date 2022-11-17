import {createSlice} from '@reduxjs/toolkit';

const registerAction = createSlice({
    name: 'register',
    initialState: {
        user: [],
    },
    reducers:{
        register(state, action){
            const newId = action.payload;
            console.log(newId.id);
            console.log(state.user.length);
            const existingId = state.user.find((userDetails) => userDetails.id === newId.id);
            
            //if(state.user.length !== 0){
                state.user.push({
                    id: newId.id,
                    name: newId.name,
                    email: newId.email,
                    password: newId.password,
                });
            //}
        },
        
    }

});

export const register_Actions = registerAction.actions;

export default registerAction;