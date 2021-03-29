import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import SwitchOnlineMode from './SwitchOnlineMode'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import LoadingOnly from 'components/shared/LoadingOnly'

const Settings = () => {
  const userId = useSelector((state: RootState) => state.auth.uid);

  return (
    <Container maxWidth="md">
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid>
            {userId ? <SwitchOnlineMode id={userId} /> : <LoadingOnly />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Settings
