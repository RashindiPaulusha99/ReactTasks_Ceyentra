import React from 'react';

const ThemeContext =  React.createContext({theme:null,});

export const ThemeContextProvider = (props)=>{

    return(
        <ThemeContext.Provider value={ThemeContext.them}>
            {props.children}
        </ThemeContext.Provider>
    );
    
}

export default ThemeContext;
