
const initialState ={
    user : [],
    isLogged: null
}

const userReducer = (state =initialState, action)=>{
    if(action.name === 'register'){
        return state;
    }
    if(action.name === 'login'){
        return state;
    }
}

export default userReducer;