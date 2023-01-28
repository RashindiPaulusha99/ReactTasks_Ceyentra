import React, { Fragment } from 'react';
import Header from '../../Layout/header/Header';
import '../../assets/Styles/Card.scss';

const Card = (props)=>{
    return(
        <Fragment>
            <Header/>
            <main className="card">{props.children}</main>
        </Fragment>
    );
}

export default Card;