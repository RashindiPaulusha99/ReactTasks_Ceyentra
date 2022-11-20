import {createSlice} from '@reduxjs/toolkit';

const loginAction = createSlice({
    name: 'login',
    initialState: {
        isLogged: null,
    },
    reducers:{
        login(state, action){
            const newId = action.payload;

            state.isLogged={
                id: newId.id,
                name: newId.name,
                email: newId.email,
                password: newId.password,
            };
        },
        
    }
});

export const login_Actions = loginAction.actions;

export default loginAction;