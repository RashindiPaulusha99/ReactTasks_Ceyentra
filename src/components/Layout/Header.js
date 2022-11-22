import {Fragment, useEffect} from 'react';
import classes from './Header.module.css';
import {useHistory} from "react-router-dom";
import Link from '@mui/material/Link';
import { useSelector,useDispatch } from 'react-redux';

import { login_Actions } from '../../store/login-action';

const Header= (props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.login.isLogged);

    useEffect(()=>{
        console.log(loginData);
    });
    
    const blog = <span className={classes.block}>BLOG</span>;

    const logoutHandler = (event)=>{
       
        dispatch(
            login_Actions.logout(null)
        );
        history.push('login');      
    }

    return(
        <Fragment>
            <header className = {classes.header}>
                <h1 style={{fontSize: '150%'}}>MY {blog}</h1>
                {loginData !== null &&
                    <div className={classes.logout}>

                        <h3 className={classes.username}>{loginData.name}</h3>
                         {loginData.log !== null && <h2>|</h2>}
                         {loginData.log !== null &&  <Link underline="none" className={classes.button} onClick={()=>logoutHandler()}>Logout</Link>}
                    </div>
                 }
            </header>
        </Fragment>
    );
}

export default Header;