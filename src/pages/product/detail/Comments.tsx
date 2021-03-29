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
import { IAuthor } from 'features/editor';

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

    const fetchUserComment = async () => {
      getCollection(PDB.PRODCUTS).doc(id).collection('comments').onSnapshot((commentRef) => {
        let commentDatas: any[] = [];

        let authors: any[] = [];

        commentRef.forEach(doc=>{

          const data = doc.data();
          const comm: any = null;

          // comm.comment = data.comment;

          commentDatas.push({
            ...data,
            id: doc.id,
            uid: data.uid.id
          })


          let refData = data.uid.get();
          authors.push(refData);
        })

          Promise.all(authors).then((values: any) => {
            interface IAuther {
              [index: string]: {};
            }
    
            let authorArr: IAuther = {};
            values.map((value: any) => {
              authorArr[value.id] = {
                uid: value.id,
                user_name: value.data().user_name,
                photo: value.data().photo,
              };
              
              return authorArr;
            });
    
            commentDatas = commentDatas.map((comment, index) => ({
              ...comment,
              author: authorArr[comment.uid] as IAuthor,
            }));

            setComments(commentDatas)
        })
        
        // const comments = commentRef.docs.map((doc: any) => {
        //   getCollection('users').doc(doc.data().uid).get().then(((dataUser: any) => {
        //     let comm: any = { comment: doc.data().comment }
        //     const user = dataUser.data();
        //     comm.user = user
        //   }));
        //   return comm
        // })

        console.log('Comments: ', comments)
        setComments(comments)
      });
    }

    fetchUserComment()
  }, []);

  return (
    <Box>
      {
        comments.length ? comments.map((comment: any) =>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={comment.author.photo}/>
              </ListItemAvatar>
              <ListItemText
                primary={comment.author.user_name}
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