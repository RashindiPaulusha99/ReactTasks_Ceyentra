import React, { Fragment, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import '../../../assets/Styles/Input.scss';

const Input =(props)=>{

    useEffect(()=>{
        console.log(props);
    });

    return(
        <Fragment>
            <TextField fullWidth 
                className="textFileds"
                id={props.id} 
                label={props.label} 
                value={props.value} 
                variant="outlined" 
                type={props.type} 
                onChange={props.onChange}
            />
        </Fragment>
    );
}

export default Input;