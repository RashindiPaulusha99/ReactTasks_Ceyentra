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

const initialValues = {id: "", name: "", email: "", password: "",};

const Register =(props)=>{

    const dispatch = useDispatch();

    const themeCtX = useContext(ThemeContext);

    const [values, setValues] = useState(initialValues);

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
        if(values.name.trim() !== '' && values.email.trim() !== '' && values.password.trim() !== '' && confirmPassword .trim() !== ''){
            setIsLoginButtonDisable(true);
        }
    });

    const userData = useSelector((state) => state.register.user);

    /*const registerHandler=(event)=>{
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
    }*/

    const handleInputChanges = (e)=>{
        console.log(e.target);
        const {name, value} = e.target;

        setValues({...values, [name]: value});
        console.log(e.target.name);

        setName(values.name);
        setEmail(values.email);
        setPassword(values.password);

       if(e.target.name === 'name'){
            if(!regExName.test(e.target.value)){
                setShowNameError(true);
            }else{
                setShowNameError(false);
            }
        }else if(e.target.name === 'email'){
            if(!regExEmail.test(e.target.value)){
                setValidateEmail(false);
                setShowEmailError(true);
            }else{
                setValidateEmail(true);
                setShowEmailError(false);
            }
        }else if(e.target.name === 'password'){
            if(!regExPassword.test(e.target.value)){
                setShowPasswordError(true);
            }else{
                setShowPasswordError(false);
            }
        }
    }    

    const registerHandler=(event)=>{
        event.preventDefault();

        setId(userData.length+1);
        
        if(values.name.trim() === '' || values.email.trim() === '' || values.password.trim() === '' || confirmPassword.trim() === ''){
            setShowAlert(0);

            if(values.password.trim() !== confirmPassword.trim()){
                setIsPasswordCorrect(true);
                setShowAlert('');

                for(let i=0; i< userData.length; i++){
                    if(userData[i].email === values.email){
                        setValues.email('');
                    }else{
                        setValues.email(values.email);
                    }
                }

            }
        }else{
            setShowAlert(1);
        }

        const existingEmail = userData.find((userDetails) => userDetails.email === values.email);
            setIsEmailExists(existingEmail);
            if(!existingEmail){
                if(!regExEmail.test(values.email)){
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
            console.log(userData);
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
                        name='name'
                        value={values.name} 
                        variant="outlined" 
                        type='text' 
                        onChange={handleInputChanges}
                    />
                    {showNameError ? <p className={classes.error_para}>Name Invalid</p> : ''}
                    <TextField fullWidth className={classes.textFileds}
                        id="email" 
                        label="Email" 
                        name='email'
                        value={values.email} 
                        variant="outlined" 
                        type='text' 
                        onChange={handleInputChanges}
                        
                    />
                    {showEmailError ? <p className={classes.error_para}>Email Invalid</p> : ''}
                    <TextField fullWidth className={classes.textFileds}
                        id="password" 
                        label="Password" 
                        name='password'
                        value={values.password} 
                        variant="outlined" 
                        type="password" 
                        onChange={handleInputChanges}
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