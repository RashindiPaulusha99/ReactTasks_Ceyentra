import React, { useEffect, useState } from "react";
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux';


import { useHistory } from "react-router-dom";
import { login_Actions } from '../store/login-action';

const Login =()=>{
    const history = useHistory();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [isLoginButtonDisable, setIsLoginButtonDisable] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const regExEmail = /^[0-9A-Z a-z$&#]{3,10}(@gmail.com)|(@yahoo.com)$/i;
    const regExPassword = /^[A-Z|a-z|0-9\s]{4,10}$/g;

    const userData = useSelector((state) => state.register.user);
    const userDatas = useSelector((state) => state.login.isLogged);

    useEffect(()=>{
        if(email.trim() !== '' && password.trim() !== ''){
            setIsLoginButtonDisable(true);
        }
    });

    const loginHandler=(event)=>{
        event.preventDefault();

        for(let i=0; i< userData.length; i++){
            if(email.trim() !== userData[i].email || password.trim() !== userData[i].password){
                setCheckEmail(1);
                setShowAlert('');
            }
        }

        for(let i=0; i< userData.length; i++){
            if(email === userData[i].email && password === userData[i].password){
                setShowAlert(1);
                setCheckEmail('');

                setId(userData[i].id);
                setName(userData[i].name);

                dispatch(
                    login_Actions.login({
                        id,
                        name,
                        email,
                        password
                    })
                );

                console.log(userDatas);

                if(id !== ''){
                    history.push('/blog');
                }
            }
        }

        if(email.trim() === '' || password.trim() === ''){
            setCheckEmail(0);
            setShowAlert('');
        }
    }

    return(
        <Card>
            <React.Fragment>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '1inch' },}}  style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                        <h1 style={{textAlign:'center'}}>SIGN IN</h1>
                        <TextField fullWidth style={{display:'block'}}
                            id="email" 
                            label="Email" 
                            value={email} 
                            variant="outlined" 
                            type='text' 
                            onChange={event=>{
                                setEmail(event.target.value);
                                if(!regExEmail.test(event.target.value)){
                                    setCheckEmail(false);
                                    setShowEmailError(true);
                                }else{
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
                                setPassword(event.target.value);
                                if(!regExPassword.test(event.target.value)){
                                    setShowPasswordError(true);
                                }else{
                                    
                                    setShowPasswordError(false);
                                }
                            }}
                        />
                        {showPasswordError ? <p style={{color:'red'}}>Password Invalid</p> : ''}
                        <Button variant="contained" disabled={!isLoginButtonDisable} style={{display:'block'}} fullWidth
                                onClick={loginHandler}
                            >
                                Sign in
                        </Button>
                       
                        <h3 style={{textAlign:'center', fontSize:'14px'}}>I don't have an account. Let's <Link to='/register'>Sign up</Link></h3>
                    </Box>
                </div>
                <div style={{margin:'10%'}}>
                    { showAlert === '' && checkEmail === 0  && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert — <strong>All fields are required !</strong>
                        </Alert>
                    </Stack>}
                    {showAlert === '' && checkEmail === 1 && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert — <strong>Invalid Email Or Password!</strong>
                        </Alert>
                    </Stack>}
                    { showAlert === 1 && checkEmail === '' && isLoginButtonDisable && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            This is a success alert — <strong>Login Successfully!</strong>
                        </Alert>
                    </Stack>}
                </div>
            </React.Fragment>
        </Card>
    );
}

export default Login;