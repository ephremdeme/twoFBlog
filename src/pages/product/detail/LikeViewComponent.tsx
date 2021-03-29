import React, { useEffect, useState } from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import { PDB } from 'features/product/init';
import { getCollection } from 'app/hooks';
import { collectionData } from 'rxfire/firestore';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

interface IProps {
  id: string;
}

const LikeViewComponent: React.FC<IProps> = ({ id }) => {
  const userId = useSelector((state: RootState) => state.auth.uid);
  const [viewsCount, setViewsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const views$ = getCollection(PDB.PRODCUTS).doc(id).collection('views');
    getCollection(PDB.PRODCUTS).doc(id).collection('views').add(userId)
    setTimeout(() => setViewsCount(viewsCount+1), 2000);

    collectionData(views$)
    .subscribe((data) => {
      setLikesCount(data.length)
    })
    const like$ = getCollection(PDB.PRODCUTS).doc(id).collection('likes');
    collectionData(like$)
    .subscribe((data) => {
      setLikesCount(data.length)
    })
  }, []);

  const handleLike = () => {
    getCollection(PDB.PRODCUTS).doc(id).collection('likes').add({
      id: userId
    })
  }

  return (
    <Box>
      <ButtonGroup
        size="small"
        aria-label="small outlined button group">
        <Button startIcon={<VisibilityIcon />}>{viewsCount}</Button>
        <Button startIcon={<FavoriteIcon />} onClick={() => handleLike} >
          {likesCount}
        </Button>
        {/* <Button startIcon={<ChatRoundedIcon />}>34</Button> */}
      </ButtonGroup>
    </Box>
  )
}

export default LikeViewComponent
