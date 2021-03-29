import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import { PDB } from 'features/product/init';
import { getCollection } from 'app/hooks';
import { collectionData } from 'rxfire/firestore';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';
import Comments from './Comments'

interface IProps {
  id: string;
}

const LikeViewComponent: React.FC<IProps> = ({ id }) => {
  const userId = useSelector((state: RootState) => state.auth.uid);
  const [viewsCount, setViewsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [viewed, setViwed] = useState(false);
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  
  useEffect(() => {

    if (getCollection(PDB.PRODCUTS).doc(id).collection('views').doc(userId).get()) setViwed(true);
    if (getCollection(PDB.PRODCUTS).doc(id).collection('views').doc(userId).get()) setLiked(true);
    if (getCollection(PDB.PRODCUTS).doc(id).collection('comments').doc(userId).get()) setCommented(true);

    getCollection(PDB.PRODCUTS).doc(id).collection('views').doc(userId).set({
      liked: true
    });

    const views$ = getCollection(PDB.PRODCUTS).doc(id).collection('views');
    views$.onSnapshot((data) => {
      if (data) {
        const viewsCountRef = data.docs.map((doc: any) => doc.data()).length;
        setViewsCount(viewsCountRef)
      }
    })

    getCollection(PDB.PRODCUTS).doc(id).collection('comments').onSnapshot((commentRef: any) => {
      const comments = commentRef.docs.map((doc: any) => doc.data())
      console.log('Comments: ', comments)
      setCommentCount(comments.length)
    });

    const likes$ = getCollection(PDB.PRODCUTS).doc(id).collection('likes');
    likes$.onSnapshot((data) => {
      if (data) {
        const likesCountRef = data.docs.map((doc: any) => doc.data()).length;
        setLikesCount(likesCountRef);
      }
    })

  }, []);

  const handleLike = () => {
    if (liked) {
      getCollection(PDB.PRODCUTS).doc(id).collection('likes').doc(userId).delete();
      setLiked(false)
    } else {
      getCollection(PDB.PRODCUTS).doc(id).collection('likes').doc(userId).set({
        liked: true
      })
      setLiked(true)
    }
  }

  const handleComment = () => {
    getCollection(PDB.PRODCUTS).doc(id).collection('comments').add({
      comment: comment,
      uid: getCollection('users').doc(userId)
    })
    setComment("");
  }

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <ButtonGroup
        size="small"
        aria-label="small outlined button group">
        <Button startIcon={<VisibilityIcon />} color={viewed ? "primary" : "default"}>{viewsCount}</Button>
        <Button startIcon={<FavoriteIcon />} onClick={handleLike} color={viewed ? "primary" : "default"} >
          {likesCount}
        </Button>
        <Button startIcon={<ChatRoundedIcon />}>{commentCount}</Button>
      </ButtonGroup>
      <Box mt={3} display="flex" py>
        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setComment(e.target.value)
            }}
            startAdornment={
              <InputAdornment position="start">
                <ChatIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <IconButton onClick={handleComment}>
          <SendIcon />
        </IconButton>
      </Box>
      <Box>
        <Comments  id={id} />
      </Box>
    </Box>
  )
}

export default LikeViewComponent
