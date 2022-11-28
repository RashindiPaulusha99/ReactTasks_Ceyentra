import React,{Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import classes from './Post.module.css';
import Card from '../../components/Card/Card';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { useReducer } from 'react';

import BlogService from '../../services/BlogService';

const initialState = 0;

function reducer(state, action) {
    switch (action) {
        case 'add': {
            return state + 1;
        }
    }
} 

const Post=(props)=>{

    const history = useHistory();
    const userData = useSelector((state) => state.login.isLogged);

    const focusElement = useRef();

    const {state} = useLocation();
    const [image, setImage] = useState('');

    const [todos, dispatch] = useReducer( reducer , initialState);

      useEffect(()=>{
        console.log(userData);
        if(userData === null){
            history.push('login');
        }else{
            const fetchDetails = async()=>{

                const response = await BlogService.fetchPosts(state.state.id);
                console.log(response);
                if(response.status === 200){
                    setImage(response.data.url);
                }
              }

              fetchDetails();
        }
        focusElement.current = focusElement.current + 1;
        console.log(focusElement.current);
            
    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const backToBlogPageHandler=()=>{
        history.push('blog');
    }

    const focus = ()=>{
        focusElement.current.focus();
    }

    return(
        <Card>
            <Fragment>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                        <Grid item xs={12} lg={6} md={6}>
                            <Item className={classes.item}>
                                <Grid item xs={12}>
                                    <div>
                                        <img src={image} alt='loading error...' className={classes.image}/>
                                    </div>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            <Item className={classes.item}>
                                <Grid item xs={12} style={{marginTop:'10%'}}>
                                    {userData !== null && <h1 style={{color:'#0984e3', textAlign: 'center',fontSize:'2em' }}>{state.state.title }</h1>}
                                </Grid>
                                <Grid item xs={12} style={{marginTop:'5%', marginBottom:'5%'}}>
                                    {userData !== null && <h3>{state.state.body}</h3>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.buttonback} onClick={backToBlogPageHandler}>Go Back</Button>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6}>
                            <Item className={classes.item}>
                                <Grid item xs={12} style={{marginTop:'10%'}}>
                                    <input type='text' ref={focusElement} value={todos}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.buttonback} onClick={focus}>Focus</Button>
                                    <Button className={classes.buttonback} onClick={()=> dispatch("add")}>Add</Button>
                                </Grid>
                            </Item>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Fragment>
        </Card>
    );
}

export default Post;