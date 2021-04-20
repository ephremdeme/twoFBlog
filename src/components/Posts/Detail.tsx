import React from 'react'
import { Grid, Typography, Box, Avatar, Paper} from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import Image from 'material-ui-image';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RenderContent from './RenderContent';
// import Blocks from 'editorjs-blocks-react-renderer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title:{
        textAlign:'center',
        width:'50%',
        margin:'0 auto',
        fontFamily:'sans-serif'
    },
    company: {
        padding:5,
        flexGrow:1
    },
    company_wrapper:{
        margin:'0 auto',
        width:'50%',
        alignItems:'center',
    },
    small: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    coverWrap:{
        // width:'75%',
        // margin:'0 auto',
    },
    cover:{
        width:'100%',
        margin:'0 auto',
    },
    blogContainer: {
        width: '75%',
    }
  }),
);

const Detail = () => {
    const classes = useStyles();
    const [blog, setBlog] = useState<any>(null);
    const location: any = useLocation();

    useEffect(() => {
        setBlog(location.state.blog);
    }, []);

    return (
        <>
            { blog ? (
                <>
                    <Grid xs={12}>
                        <Typography
                            className={classes.title}
                            variant="h3"
                        >
                        { blog.title}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Box 
                            display="flex"
                            className={classes.company_wrapper}
                        >
                            <Avatar alt="Remy Sharp" 
                                src={`${process.env.PUBLIC_URL}/images/image_logo.png`} 
                                className={classes.small}
                            />
                                <Typography 
                                    variant="h6" 
                                    className={classes.company}
                                >
                                        Abxy Trading plc.
                                </Typography>
                                <AccessTimeIcon style={{ color: 'gray'}}/>  
                                <Typography
                                    color="textSecondary" 
                                    variant="h6" 
                                    style={{ fontWeight:'bolder'}}
                                >
                                    Oct. 16 2021 
                                </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Paper 
                            variant="outlined"
                            className={classes.coverWrap}
                        >
                            <img 
                                src={blog.coverUrl} 
                                className={classes.cover}
                            />
                        </Paper>
                    </Grid>
                    <Grid 
                        xs={12}
                        className={classes.blogContainer}
                    >
                        <RenderContent blog={blog} />
                    </Grid>
                </>
            ) : <h2>no data</h2> }
        </>
    )
}

export default Detail;