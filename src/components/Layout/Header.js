import {Fragment} from 'react';
import classes from './Header.module.css';

const Header= (props)=>{

    const blog = <span className={classes.block}>BLOG</span>;
    
    return(
        <Fragment>
            <header className = {classes.header}>
                <h1>MY {blog}</h1>
            </header>
        </Fragment>
    );
}

export default Header;