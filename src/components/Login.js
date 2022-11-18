import React, { useEffect, useState } from "react";
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useSelector, useDispatch } from 'react-redux';
import Register from "./Register";

const Login =(props)=>{

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginButtonDisable, setIsLoginButtonDisable] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [signup, setSignUp] = useState(false);

    const userData = useSelector((state) => state.register.user);

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
            }
        }

        if(email.trim() === '' || password.trim() === ''){
            setCheckEmail(0);
            setShowAlert('');
        }

    }

    const register=()=>{
        setSignUp(true);

        
        
    }

    return(
        <Card>
            {signup ? <Register/> : 

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
                                setEmail(event.target.value)
                            }}
                        />
                        <TextField fullWidth style={{display:'block'}}
                            id="password" 
                            label="Password" 
                            value={password} 
                            variant="outlined" 
                            type="password" 
                            onChange={event=>{
                                setPassword(event.target.value)
                            }}
                        />
                        <Button variant="contained" disabled={!isLoginButtonDisable} style={{display:'block'}} fullWidth
                            onClick={loginHandler}
                        >
                            Sign in
                        </Button>
                       
                        <h3 style={{textAlign:'center', fontSize:'14px'}}>I don't have an account. Let's <Link href="#" onClick={register}>Sign up</Link></h3>
                    </Box>
                </div>
                <div style={{margin:'10%'}}>
                    { showAlert === '' && checkEmail === 0  && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert — <strong>All fields are required !</strong>
                        </Alert>
                    </Stack>}
                    {showAlert === '' && checkEmail === 1 && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="warning">
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
               
            }
        </Card>


    );
}

export default Login;