import {configureStore} from '@reduxjs/toolkit';
import loginAction from '../actions/login-action';
import registerAction from '../actions/register-action';

const store = configureStore({
    reducer:{
        login:loginAction.reducer,
        register: registerAction.reducer
    }
});

export default store;