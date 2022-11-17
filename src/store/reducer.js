
const initialState ={
    user : []
}

const userReducer = (state =initialState, action)=>{
    if(action.name === 'register'){
        return state;
    }
}

export default userReducer;