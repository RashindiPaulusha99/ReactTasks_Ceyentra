import {Fragment} from 'react';
import classes from './Header.module.css';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

const Header= (props)=>{
    const loginData = useSelector((state) => state.login.isLogged);

    const blog = <span className={classes.block}>BLOG</span>;

    return(
        <Fragment>
            <header className = {classes.header}>
                <h1>MY {blog}</h1>
                {loginData !== null && (
                    <div className={classes.logout}>
                        <h3 className={classes.username}>{loginData.name}</h3>
                        <h2>|</h2>
                        <Link className={classes.button} to='/register'>Logout</Link>
                    </div>
                )}
            </header>
        </Fragment>
    );
}

export default Header;