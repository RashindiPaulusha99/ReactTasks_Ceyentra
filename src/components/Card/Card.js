import React, { Fragment } from 'react';
import Header from '../Layout/Header';
import classes from './Card.module.css';

const Card = (props)=>{
    return(
        <Fragment>
            <Header/>
            <main className={classes.card}>{props.children}</main>
        </Fragment>
    );
}

export default Card;