export const initialState = {
    isAuthenticated:false,
    name:null,
    token:null,
    email:null
}

export const authReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('name',action.payload.name);
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('email',action.payload.email);
            return{
                ...state,
                isAuthenticated:true,
                name:action.payload.name,
                token:action.payload.token,
                email:action.payload.email
            };
        case 'LOGOUT':
            localStorage.clear();
            return{
                ...state,
                isAuthenticated:false,
                name:null,
                token:null
            };
        default:
            return{
                state                
            };
    }
}