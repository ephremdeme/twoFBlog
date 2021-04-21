import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      pathname: `/posts/${props.blog.data().title}/edit`,
      state: { blog: props.blog.data(), id: props.blog.id }
    });
  }

  const viewClickHandle = () => {
    history.push({
      pathname: `/posts/${props.blog.data().title}/detail`,
      state: { blog: props.blog.data() }
    });
  }

  return (
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