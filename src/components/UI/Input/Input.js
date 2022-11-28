import React, { Fragment, useEffect, useState } from "react";
import classes from './Input.module.css';
import './style.scss';

import TextField from '@mui/material/TextField';

const Input =(props)=>{

    useEffect(()=>{
        console.log(props);
    });

    return(
        <Fragment>
            <TextField fullWidth 
                className={classes.textFileds}
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