import React, { useEffect, useState } from "react";
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Login from '../components/Login';

import { useDispatch, useSelector } from 'react-redux';
import { register_Actions } from '../store/register-action';

const Register =(props)=>{

    const dispatch = useDispatch();
    const { did, ClientName, ClientEmail, ClientPassword } = props;

    const [id, setId] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginButtonDisable, setIsLoginButtonDisable] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const userData = useSelector((state) => state.register.user);

    useEffect(()=>{
       
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword .trim() !== ''){
            setIsLoginButtonDisable(true);
        }
    });

    const loginHandler=(event)=>{
        event.preventDefault();

        setId(userData.length+1);
        
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            setShowAlert(0);
        }else{
            setShowAlert(1);
        }

        if(password.trim() !== confirmPassword.trim()){
            setIsPasswordCorrect(true);
            setShowAlert('');
        }

        dispatch(
            register_Actions.register({
                id,
                name,
                email,
                password
            })
        );
       
        console.log(userData.length);
        console.log(userData);
        console.log(id, name, email, password);
    }

    const loginPage = <Login/>;

    return(
        <Card>
            <div style={{display:'flex', justifyContent:'center'}}>
                
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '1inch' },}} style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
                    <h1 style={{textAlign:'center'}}>SIGN UP</h1>
                    <TextField fullWidth style={{display:'block'}}
                        id="name" 
                        label="Name" 
                        value={name} 
                        variant="outlined" 
                        type='text' 
                        onChange={event=>{
                            setName(event.target.value)
                        }}
                    />
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
                    <Button variant="contained" disabled={!isLoginButtonDisable} style={{display:'block'}}
                        onClick={loginHandler}
                    >
                        Sign up
                    </Button>
                   
                    <h3 style={{textAlign:'center', fontSize:'14px'}}>I already have an account. <Link href="#" >Sign in</Link>
                    </h3>
                </Box>
            </div>
            <div style={{margin:'10%'}}>
                { showAlert=== 0 && <Stack sx={{ width: '100%' }} spacing={1}>
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        This is a warning alert — <strong>All fields are required !</strong>
                    </Alert>
                </Stack>}
                { showAlert === 1 && isLoginButtonDisable && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>Successfully Registered!</strong>
                    </Alert>
                </Stack>}
                { isPasswordCorrect && showAlert === ''  && <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        This is a warning alert — <strong>Password not match!</strong>
                    </Alert>
                </Stack>}
            </div>
        </Card>
    );
}

export default Register;