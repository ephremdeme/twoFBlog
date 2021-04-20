import React from 'react'
import { Grid, Box } from '@material-ui/core';
import PostItem from './PostItem';
import firebase from '../../firebase/firebase';
import { useEffect, useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


function PostListItem (){
    const [blogs, setBlogs] = useState<any []>([]);

    const ref = firebase.firestore().collection("f2-blogs");

    function getBlogs () {
        ref.onSnapshot((querySnapshot) => {
            const items: any [] = [];

            querySnapshot.forEach((doc) => {
                items.push(doc)
                // console.log(items)
            });
            setBlogs(items);
        });
    }

    useEffect(() =>{
        getBlogs();
    }, []);
   
    return (
        <>
            { blogs.length ? blogs.map((blog) => (
                <Grid item xs={4} key={blog.id}>
                    <PostItem blog={ blog }/>
                </Grid>
            )) : (
                    <Grid container spacing={3}>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid> 
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid> 
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid> 
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid>
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid> 
                        <Grid xs={4}>
                            <Skeleton variant="rect" width={350} height={118} />
                            <Skeleton  width={350}/>
                        </Grid> 
                    </Grid>
            ) }
        </>
    )
}

export default PostListItem