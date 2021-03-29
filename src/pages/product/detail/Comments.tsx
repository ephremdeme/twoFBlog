import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getCollection } from 'app/hooks';
import { PDB } from 'features/product/init';
import LoadingOnly from 'components/shared/LoadingOnly';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.default,
    },
    inline: {
      display: 'inline',
    },
  }),
);

interface IProps {
  id: string;
}

const Comments: React.FC<IProps> = ({ id }) => {
  const classes = useStyles();
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    getCollection(PDB.PRODCUTS).doc(id).collection('comments').onSnapshot((commentRef: any) => {
      const comments = commentRef.docs.map((doc: any) => doc.data())
      const users: any[] = [];
      setComments(comments.map((comment: any) => {
        const commentDataWithUser: any = { comment: comment.comment }
        getCollection('users').doc(comment.uid).get().then(((dataUser: any) => {
          const user = dataUser.data();
          commentDataWithUser.author = { userName: user.user_name, photo: user.photo, }
          return commentDataWithUser
        }));
      }))
      // console.log('Users', users)
      console.log('Comments: ', comments)
      setComments(comments)
    });
  }, []);

  return (
    <Box>
      {
        comments.length ? comments.map((comment: any) =>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="User"
                secondary={comment.comment}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ) :
          <LoadingOnly />
      }
    </Box>
  );
}


export default Comments