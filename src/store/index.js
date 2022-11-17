import {configureStore} from '@reduxjs/toolkit';
import loginAction from './login-action';
import registerAction from './register-action';


const store = configureStore({
    reducer:{
        login:loginAction.reducer,
        register: registerAction.reducer
    }
});

export default store;