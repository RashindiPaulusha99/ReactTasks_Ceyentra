import React, { useEffect, useState, useContext } from "react";
import Card from '../../components/Card/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

import classes from './Register.module.css';

import ThemeContext from "../../Context/auth-context";

import { useDispatch, useSelector } from 'react-redux';
import { register_Actions } from '../../store/actions/register-action';

const Register =(props)=>{

    const dispatch = useDispatch();

    const themeCtX = useContext(ThemeContext);

    const [id, setId] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginButtonDisable, setIsLoginButtonDisable] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showNameError, setShowNameError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const regExEmail = /^[0-9A-Z a-z$&#]{3,10}(@gmail.com)|(@yahoo.com)$/i;
    const regExName = /^[A-Z|a-z\s]{3,20}$/i;
    const regExPassword = /^[A-Z|a-z|0-9\s]{4,10}$/g;

    useEffect(()=>{
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword .trim() !== ''){
            setIsLoginButtonDisable(true);
        }
    });

    const userData = useSelector((state) => state.register.user);

    const registerHandler=(event)=>{
        event.preventDefault();

        setId(userData.length+1);
        
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            setShowAlert(0);

            if(password.trim() !== confirmPassword.trim()){
                setIsPasswordCorrect(true);
                setShowAlert('');

                for(let i=0; i< userData.length; i++){
                    if(userData[i].email === email){
                        setEmail('');
                    }else{
                        setEmail(email);
                    }
                }

            }
        }else{
            setShowAlert(1);
        }

        const existingEmail = userData.find((userDetails) => userDetails.email === email);
            setIsEmailExists(existingEmail);
            if(!existingEmail){
                if(!regExEmail.test(email)){
                    setValidateEmail(false);
                    setShowEmailError(true);
                }else{
                    dispatch(
                        register_Actions.register({
                            id,
                            name,
                            email,
                            password
                        })
                    );
                }
            }
        }

    return(
        <Card>
            <React.Fragment>
            <div className={classes.form} style={{ backgroundColor: themeCtX.theme === null || themeCtX.theme === 'dark' ? '#00cec9' : 'white' }}>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '1inch' },}} className={classes.box}>
                    <h1 className={classes.heading}>SIGN UP</h1>
                    <TextField fullWidth className={classes.textFileds}
                        id="name" 
                        label="Name" 
                        value={name} 
                        variant="outlined" 
                        type='text' 
                        onChange={event=>{
                            setName(event.target.value);
                            if(!regExName.test(event.target.value)){
                                setShowNameError(true);
                            }else{
                                setShowNameError(false);
                            }
                        }}
                    />
                    {showNameError ? <p className={classes.error_para}>Name Invalid</p> : ''}
                    <TextField fullWidth className={classes.textFileds}
                        id="email" 
                        label="Email" 
                        value={email} 
                        variant="outlined" 
                        type='text' 
                        onChange={event=>{
                            setEmail(event.target.value);
                            if(!regExEmail.test(event.target.value)){
                                setValidateEmail(false);
                                setShowEmailError(true);
                            }else{
                                setValidateEmail(true);
                                setShowEmailError(false);
                            }
                        }}
                        
                    />
                    {showEmailError ? <p className={classes.error_para}>Email Invalid</p> : ''}
                    <TextField fullWidth className={classes.textFileds}
                        id="password" 
                        label="Password" 
                        value={password} 
                        variant="outlined" 
                        type="password" 
                        onChange={event=>{
                            setPassword(event.target.value)
                            if(!regExPassword.test(event.target.value)){
                                setShowPasswordError(true);
                            }else{
                                
                                setShowPasswordError(false);
                            }
                        }}
                    />
                    {showPasswordError ? <p className={classes.error_para}>Password Invalid</p> : ''}
                    <TextField fullWidth className={classes.textFileds}
                        id="confirmPassword" 
                        label="Re-enter password" 
                        value={confirmPassword} 
                        variant="outlined" 
                        type="password" 
                        onChange={event=>{
                            setConfirmPassword(event.target.value)
                        }}
                    />
                    <Button variant="contained" disabled={!isLoginButtonDisable} className={classes.signup_button} fullWidth
                        onClick={registerHandler}
                    >
                        Sign up
                    </Button>
                
                    <h3 className={classes.signin_link}>I already have an account. <Link to="/login">Sign in</Link>
                    </h3>
                </Box>
            </div>
            <div className={classes.alertContainer}>
                {!showPasswordError && !showNameError && !showEmailError && showAlert=== 0 && !validateEmail && <Stack sx={{ width: '100%' }} spacing={1}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is a error alert — <strong>All fields are required !</strong>
                    </Alert>
                </Stack>}
                {!showPasswordError && !showNameError && !showEmailError &&  validateEmail && !isEmailExists && showAlert === 1 && isLoginButtonDisable && userData.length !== 0 &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>Successfully Registered!</strong>
                    </Alert>
                </Stack>}
                {!showPasswordError && !showNameError && !showEmailError &&  isPasswordCorrect && showAlert === ''  && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is a error alert — <strong>Password not match!</strong>
                    </Alert>
                </Stack>}
                {!showPasswordError && !showNameError && !showEmailError &&  isEmailExists  && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is a error alert — <strong>Email Already Exists!</strong>
                    </Alert>
                </Stack>}
            </div>
            </React.Fragment>
        </Card>
    );
}

export default Register;