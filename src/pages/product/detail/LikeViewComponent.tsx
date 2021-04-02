import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core'
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
import { Rating } from '@material-ui/lab';

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
  const [commentLoad, setCommentLoad] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [rating, setRating] = useState<number | null>(0);

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
      rating: rating,
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
        {!commentLoad ?
          <Button startIcon={<ChatRoundedIcon />} onClick={() => setCommentLoad(true)}><small>Load comments</small></Button>
          : <Button startIcon={<ChatRoundedIcon />}>{commentCount}</Button>
        }
      </ButtonGroup>

      <Box mt={3} display="flex" flexDirection="column" py>
        <Box display="flex" alignItems="center" mb={1}>
          <Box fontWeight={400} fontSize=".9rem">Rating: &nbsp;</Box>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Input
            id="input-with-icon-adornment"
            value={comment}
            style={{
              fontWeight: "normal",
              fontSize: ".82rem",
              width: '100%'
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setComment(e.target.value)
            }}
            startAdornment={
              <InputAdornment position="start">
                <ChatIcon />
              </InputAdornment>
            }
          />
          <Button variant="outlined" size="small" style={{ margin: "0 1rem" }} onClick={handleComment}>
            send
          </Button>
        </Box>
      </Box>
      <Box>
        {commentLoad && <Comments id={id} />}
      </Box>
    </Box>
  )
}

export default LikeViewComponent
