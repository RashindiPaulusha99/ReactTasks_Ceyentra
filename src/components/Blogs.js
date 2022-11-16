import React, {useState} from 'react';
import classes from './BlogList.module.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Blogs=(posts, loading)=>{

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    if(loading){
        return(
            <React.Fragment>
                

                     <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} columns={{ xs: 4, sm: 6, md: 12 }} >
                        {posts.posts.map((post) =>(
                            <Grid item xs={4} lg={4} md={4}  key={post.id}>
                                <Item className={classes.item}><h3 style={{color:'blue'}}>{post.title}</h3>
                                    <p>{post.body}</p>
                                    <div style={{ display:'flex', flexDirection:'row',justifyContent: 'space-evenly'}}>
                                        <div style={{ width:'50%'}}>
                                            <h5 className={classes.text}>ArticleNO: {post.id < 10 ? '0'+post.id : post.id}</h5>
                                        </div>
                                        <div style={{ width:'50%'}}>
                                            <h5 className={classes.text}>UserID: {post.userId < 10 ? '0'+post.userId : post.userId}</h5>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                        ))}
                                
                        </Grid>
                    </Box>

                    
                    
               
             </React.Fragment>
          
        );
    }

   
    

   
}

export default Blogs;