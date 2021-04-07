import React, { useState } from 'react'
import { Box, Button, ButtonGroup, createStyles, Divider, Grid, IconButton, makeStyles, TextField, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block',
    },
    margin: {
      margin: theme.spacing(1),
    },
    additionalFieldFormContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: 5,
      border: theme.palette.type == 'dark' ? "1px solid #777" : "1px solid #ddd"
    },
    inputField: {
      minWidth: "250px",
      margin: "10px 1rem"
    },
    addDelBtnContainer: {
      maxWidth: "50px",
      minWidth: "50px"
    }
  })
);

const AdditionalDescriptionForm = ({ descriptions }: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const lgQ = useMediaQuery(theme.breakpoints.up("lg"));
  const [descriptionList, setDescriptionList] = useState([
    { description_field: '', description: '' },
  ]);
  const handleInputChange = (
    e: React.SyntheticEvent<EventTarget>,
    index: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;
    const list: any = [...descriptionList];

    if (name) {
      list[index][name] = value;
    }
    setDescriptionList(list);
    descriptions(descriptionList);
  };
  const handleRemoveClick = (index: number) => {
    const list = [...descriptionList];
    list.splice(index, 1);
    setDescriptionList(list);
  };

  const handleAddClick = () => {
    setDescriptionList([
      ...descriptionList,
      { description_field: '', description: '' },
    ]);
  };

  const getOrentationForBtns = () => {
    return lgQ ? "vertical" : "horizontal"
  }

  return (
    <div>
      {descriptionList.map((desc, i) => {
        return (
          <Box key={i} mt={2} alignItems="center" className={classes.additionalFieldFormContainer}>
            <Grid container justify="center">
              <Grid item xs={10} md={6} lg={5}>
                <Box mx={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    id="input-with-icon-grid"
                    name="description_field"
                    label="Branch Name"
                    value={desc.description_field}
                    required
                    className={classes.inputField}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={6} lg={7}>
                <Box mx={1} display={{ xs: "block", md: "flex", lg: "flex" }} alignItems="center" mb={2}>
                  <Box>
                    <TextField
                      variant="outlined"
                      size="small"
                      id="input-with-icon-grid"
                      name="description"
                      label="Branch Phone Number"
                      required
                      className={classes.inputField}
                      value={desc.description}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      id="input-with-icon-grid"
                      name="description"
                      label="Branch Adress"
                      required
                      className={classes.inputField}
                      value={desc.description}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Box>
                  <Box className={classes.addDelBtnContainer} ml={2}>
                    <ButtonGroup
                      orientation={getOrentationForBtns()}
                      aria-label="small outlined button group">
                      {descriptionList.length !== 1 && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          aria-label="delete"
                          onClick={() => handleRemoveClick(i)}>
                          <DeleteIcon />
                        </Button>
                      )}
                      {descriptionList.length - 1 === i && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          aria-label="delete"
                          onClick={handleAddClick}>
                          <AddBoxIcon />
                        </Button>
                      )}
                    </ButtonGroup>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </div>
  )
}

export default AdditionalDescriptionForm
