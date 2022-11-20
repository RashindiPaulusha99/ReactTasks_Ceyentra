import React,{Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import classes from './Post.module.css';
import { useHistory } from "react-router-dom";

const Post=(props)=>{

    const history = useHistory();
    const {state} = useLocation();
    const [image, setImage] = useState('');
   
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      useEffect(()=>{

        const fetchDetails = async()=>{
          
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/photos/'+ state.state.id
          );

          const responseData = await response.json();

          setImage(responseData.url);

        }
        fetchDetails();
    }, []);

    const backToBlogPageHandler=()=>{
        history.push('blog');
    }
   
    return(
        <Fragment>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 5 }}>
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
                                <h1 style={{color:'#0984e3', textAlign: 'center' }}>{state.state.title}</h1>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'5%', marginBottom:'5%'}}>
                                <h3>{state.state.body}</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className={classes.buttonback} onClick={backToBlogPageHandler}>Go Back</Button>
                            </Grid>
                        </Item>
                    </Grid>
                    
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Post;