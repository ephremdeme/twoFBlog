import React from 'react'
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import CreatedForm from './CreatedForm'

const form = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Box my={3} fontWeight={600} fontSize="1.2rem" >Input Creator</Box>
          <Box my={2}>
            <TextField
              variant="outlined"
              size="small"
              id="input-with-icon-grid"
              name="description_field"
              label="Field Name"
              style={{ minWidth: 260 }}
              required
              // value={desc.description_field}
              // onChange={(e) => handleInputChange(e, i)}
            />
          </Box>
          <Box my={2}>
            <FormControl variant="outlined" size="small" style={{ minWidth: 260 }}>
              <InputLabel id="demo-simple-select-outlined-label">Shope</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Field Type"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Text</MenuItem>
                <MenuItem value={20}>Email</MenuItem>
                <MenuItem value={30}>Number</MenuItem>
                <MenuItem value={30}>Checkbox</MenuItem>
                <MenuItem value={30}>Radio</MenuItem>
                <MenuItem value={30}>Text Area</MenuItem>
                <MenuItem value={30}>Tel</MenuItem>
                <MenuItem value={30}>Select</MenuItem>
                <MenuItem value={30}>Select</MenuItem>
                <MenuItem value={30}>Date Time</MenuItem>
                <MenuItem value={30}>Range</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" size="small">
              Create
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <CreatedForm />
        </Grid>
      </Grid>
    </Container>
  )
}

export default form
