import React, {useEffect, useState} from 'react';
import '../../assets/Styles/BlogList.scss';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const Blogs=(posts, loading)=>{
    const history = useHistory();
    const userData = useSelector((state) => state.login.isLogged);

    useEffect(()=>{
        if(userData === null){
            history.push('login');
        }
    });

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const clickPostHandler=(event)=>{
           history.push('/post',{ state: { id: event.id, title: event.title, body: event.body } });
      }

    if(loading){
        return(
            <React.Fragment>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 12 }} >
                        {posts.posts.map((post) =>(
                            <Grid item xs={4} lg={4} md={4}  key={post.id} >
                                <Item className="item" onClick={()=>clickPostHandler(post)}>
                                    <h3 className='post_title' >{post.title}</h3>
                                    <p>{post.body}</p>
                                    <div className='blog_ids_container'>
                                        <div className='ids_div'>
                                            <h5 className="text">ArticleNO: {post.id < 10 ? '0'+post.id : post.id}</h5>
                                        </div>
                                        <div className='ids_div'>
                                            <h5 className="text" >UserID: {post.userId < 10 ? '0'+post.userId : post.userId}</h5>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                        ))}        
                    </Grid>
                </Box>  
            </React.Fragment> 
        );
    } else{
        <p>Loading....</p>
    } 
}

export default Blogs;