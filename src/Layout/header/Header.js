import React, {Fragment, useEffect, useContext} from 'react';

import classes from './Header.module.css';

import {useHistory} from "react-router-dom";

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import { useSelector,useDispatch } from 'react-redux';

import ThemeContext from "../../Context/auth-context";

import { login_Actions } from '../../store/actions/login-action';

const Header= (props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const themeCtX = useContext(ThemeContext);
    const loginData = useSelector((state) => state.login.isLogged);

    const [open, setOpen] = React.useState(false);

    const [theme, setTheme] = React.useState('');

    useEffect(()=>{
        console.log(loginData);
        console.log(themeCtX);

    });
    
    const blog = <span className={classes.block}>BLOG</span>;

    const logoutHandler = (event)=>{

        dispatch(
            login_Actions.logout(null)
        );
        history.push('login');      
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        
        themeCtX.theme = theme;
      };

      const handlethemecolour=(event)=>{
        setTheme(event);
      }

    return(
        <Fragment>
            <header className = {classes.header}>
                <h1 style={{fontSize: '150%'}}>MY {blog}</h1>
                <Button variant="outlined" onClick={handleClickOpen}>
                    select theme
                </Button>
                {loginData !== null &&
                    <div className={classes.logout}>
                        <h3 className={classes.username}>{loginData.name}</h3>
                        <h3></h3>
                         {loginData.log !== null && <h2>|</h2>}
                         {loginData.log !== null &&  <Link underline="none" className={classes.button} onClick={()=>logoutHandler()}>Logout</Link>}
                    </div>
                 }

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Optional Themes</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can set theme colour.
                        </DialogContentText>
                        <Box noValidate component="form" sx={{display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content',}}>
                            <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                <InputLabel htmlFor="theme">Theme</InputLabel>
                                <Select
                                    autoFocus
                                    value={theme}
                                    label="theme" inputProps={{name: 'theme',id: 'theme',}}
                                    onChange={event=>{
                                        handlethemecolour(event.target.value);}} >
                                    <MenuItem value="dark">Dark</MenuItem>
                                    <MenuItem value="light">Light</MenuItem>
                                </Select>
                            </FormControl> 
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>

            </header>
        </Fragment>
    );
}

export default Header;