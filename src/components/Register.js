import React, { useEffect, useState } from "react";
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import { Form } from "reactstrap";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';
import { register_Actions } from '../store/register-action';

const Register =(props)=>{

    const dispatch = useDispatch();
    const { did, ClientName, ClientEmail, ClientPassword } = props;

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginButtonDisable, setIsLoginButtonDisable] = useState(false);
    const [showAlert, setShowAlert] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const userData = useSelector((state) => state.register.user);

    useEffect(()=>{
        setId(1);
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword .trim() !== ''){
            setIsLoginButtonDisable(true);
        }
    });
    let ids = id;

    const loginHandler=(event)=>{
        event.preventDefault();
        
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            setShowAlert(0);
        }else if(password.trim() !== confirmPassword.trim()){
            setIsPasswordCorrect(true);
        }else{
            setShowAlert(1);
        }

        dispatch(
            register_Actions.register({
                id,
                name,
                email,
                password
            })
        );

        setId(ids++);

        console.log(userData);
        console.log(id, name, email, password);
    }

    return(
        <Card>
            <Form style={{display:'flex', justifyContent:'center'}}>
                
                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '1inch' },}} autoComplete="off" style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
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
                   
                    <h3 style={{textAlign:'center', fontSize:'14px'}}>I already have an account. <Link href="#">Sign up</Link></h3>
                </Box>
            </Form>
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
                        This is a success alert — <strong>Login Successfully!</strong>
                    </Alert>
                </Stack>}
                { isPasswordCorrect && showAlert === 1  && <Stack sx={{ width: '100%' }} spacing={2}>
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