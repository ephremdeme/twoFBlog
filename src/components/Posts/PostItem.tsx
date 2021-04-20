import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { Avatar,Box, Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   display: 'flex',
    //   // height: '13vw'
    // },
    // details: {
    //   display: 'flex',
    //   flexDirection: 'column',
    // },
    // content: {
    //   flex: '1 0 auto',
    // },
    // cover: {
    //   width: '50%',
    // },
    // controls: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   paddingLeft: theme.spacing(1),
    //   paddingBottom: theme.spacing(1),
    // },
    // playIcon: {
    //   height: 38,
    //   width: 38,
    // },
    // paper: {
    //     padding: theme.spacing(2),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
    // main: {
    //     width:'80%',
    //     margin:'0 auto'
    // },
    // company: {
    //     padding:5
    // },
    // small: {
    //   width: theme.spacing(3),
    //   height: theme.spacing(3),
    // },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  }),
);

const PostItem = (props: any) => {
    const classes = useStyles();
    const history = useHistory();

    const editClickHandle = () => {
        history.push({
          pathname:'/posts/edit',
          state: { blog:props.blog.data(), id:props.blog.id }
        });
    }

    const viewClickHandle = () => {
      history.push({
        pathname:'/posts/detail',
        state: { blog:props.blog.data() }
      });
    }

    return (
            // <Card className={classes.root} elevation={1}>
            //     <div className={classes.details}>
            //         <CardContent className={classes.content}>
            //             <Box display="flex">
            //                 <Avatar alt="Remy Sharp" 
            //                     src={`${process.env.PUBLIC_URL}/images/image_logo.png`} 
            //                     className={classes.small}
            //                 />
            //                 <Typography 
            //                     variant="caption" 
            //                     className={classes.company}
            //                 >
            //                         Abxy Trading plc.
            //                 </Typography>
            //             </Box>

            //             <Typography 
            //                 variant="h6"
            //                 // noWrap
            //             >
            //                 {props.blog.data().title}
            //             </Typography>
            //             {/* <img 
            //               src={ props.blog.data().coverUrl } 
            //               width={250} 
            //               height={150}
            //               style={{ margin:'0 auto'}}
            //             /> */}
            //             <Typography 
            //                 variant="caption" 
            //                 color="textSecondary"
            //             >
            //                 Oct 16, 2020
            //             </Typography>
            //         </CardContent>
            //         <CardActions>
                        // <Button size="small" color="primary" onClick={viewClickHandle}>
                        //   <VisibilityIcon />
                        // </Button>
                        // <Button size="small" color="primary" onClick={editClickHandle}>
                        //   <EditIcon />
                        // </Button>
            //         </CardActions>
            //     </div>
            //     <CardMedia
            //         className={classes.cover}
            //         image={ props.blog.data().coverUrl }
            //         title="Live from space album cover"
            //     />
            // </Card>
            <Card className={classes.root}>
              <CardActionArea onClick={viewClickHandle}>
                <CardMedia
                  className={classes.media}
                  image={props.blog.data().coverUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    noWrap
                  >
                  {props.blog.data().title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Oct 16, 2020
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button> */}
                <Button size="small" color="primary" onClick={viewClickHandle}>
                  <VisibilityIcon />
                </Button>
                <Button size="small" color="primary" onClick={editClickHandle}>
                  <EditIcon />
                </Button>
              </CardActions>
            </Card>
        )
}

export default PostItem;