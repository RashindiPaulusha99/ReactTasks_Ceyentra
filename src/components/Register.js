import React, { useEffect, useState } from "react";
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { register_Actions } from '../store/register-action';

const Register =(props)=>{

    const dispatch = useDispatch();

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
            <div style={{display:'flex', justifyContent:'center', backgroundColor: '#00cec9', height: '70vh', width: '50vw',position: "absolute", top: '300px', bottom:'0', left:'0', right: '0', margin: 'auto',boxShadow: 'rgba(44, 153, 149, 0.4) 5px 5px, rgba(44, 153, 149, 0.3) 10px 10px, rgba(44, 153, 149, 0.2) 15px 15px, rgba(44, 153, 149, 0.1) 20px 20px, rgba(44, 153, 149, 0.05) 25px 25px' }}>
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '1inch' },}} style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                    <h1 style={{textAlign:'center'}}>SIGN UP</h1>
                    <TextField fullWidth style={{display:'block'}}
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
                    {showNameError ? <p style={{color:'red'}}>Name Invalid</p> : ''}
                    <TextField fullWidth style={{display:'block'}}
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
                    {showEmailError ? <p style={{color:'red'}}>Email Invalid</p> : ''}
                    <TextField fullWidth style={{display:'block'}}
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
                    {showPasswordError ? <p style={{color:'red'}}>Password Invalid</p> : ''}
                    <TextField fullWidth style={{display:'block'}}
                        id="confirmPassword" 
                        label="Re-enter password" 
                        value={confirmPassword} 
                        variant="outlined" 
                        type="password" 
                        onChange={event=>{
                            setConfirmPassword(event.target.value)
                        }}
                    />
                    <Button variant="contained" disabled={!isLoginButtonDisable} style={{display:'block', backgroundColor: '#00b894'}} fullWidth
                        onClick={registerHandler}
                    >
                        Sign up
                    </Button>
                
                    <h3 style={{textAlign:'center', fontSize:'14px'}}>I already have an account. <Link to="/login">Sign in</Link>
                    </h3>
                </Box>
            </div>
            <div style={{margin:'10%', position: 'absolute', top: '400px',left:'200px',right: '0', width: '50%'}}>
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