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
import { Box, Button, IconButton } from '@material-ui/core';
import { IAuthor } from 'features/editor';
import { Rating } from '@material-ui/lab';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

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
    avatar: {

    },
    commentText: {
      color: `${theme.palette.type == 'dark' ? '#aaa' : '#444'}`
    }
  }),
);

interface IProps {
  id: string;
}

const Comments: React.FC<IProps> = ({ id }) => {
  const classes = useStyles();
  const userId = useSelector((state: RootState) => state.auth.uid);
  const [comments, setComments] = useState<any[] | null>(null);

  useEffect(() => {

    const fetchUserComment = async () => {
      getCollection(PDB.PRODCUTS).doc(id).collection('comments').onSnapshot((commentRef) => {
        let commentDatas: any[] = [];

        let authors: any[] = [];

        commentRef.forEach(doc => {

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

        console.log('Comments: ', comments)
        setComments(comments)
      });
    }

    fetchUserComment()
  }, []);

  const deleteComment = (idX: string) => {
    const ref$ = getCollection(PDB.PRODCUTS).doc(id).collection('comments').doc(idX);
    ref$.delete().then(()=>console.log("Deleted"), (err)=>console.log(err));
  }

  const updateComment = (data: { comment?: string, rating?: string }) => {
    getCollection(PDB.PRODCUTS).doc(id).collection('comments').doc(id).update(data);
  }

  return (
    <Box>
      {
        comments ? comments.map((comment: any) =>
          <Box display="flex" my={2} className={classes.root}>
            <Box>
              <Avatar className={classes.avatar} alt={comment.author.user_name} src={comment.author.photo} />
            </Box>
            <Box ml={2}>
              <Box display="flex" alignItems="center" >
                <Box>
                  {comment.author.user_name}
                </Box>
                <Box ml={1}>
                  <Rating name="read-only" size="small" value={comment.rating} readOnly />
                </Box>
                <Box alignSelf="end" ml={2}>
                  {
                    comment.author.uid == userId &&
                    <IconButton size="small" onClick={() => deleteComment(comment.id)}>
                      <DeleteSweepIcon />
                    </IconButton>
                  }
                </Box>
              </Box>
              <Box fontSize=".8rem" fontWeight={300} className={classes.commentText}>
                {comment.comment}
              </Box>
            </Box>
          </Box>
        ) :
          <LoadingOnly />
      }
    </Box>
  );
}


export default Comments