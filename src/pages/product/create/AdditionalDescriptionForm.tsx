import React, { useState } from 'react'
import { Box, Button, ButtonGroup, createStyles, Grid, IconButton, makeStyles, TextField, Theme } from '@material-ui/core';
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
      maxWidth: '550px',
      display: "flex"
    }
  })
);

const AdditionalDescriptionForm = ({ descriptions }: any) => {
  const classes = useStyles();
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

  return (
    <div>
      {descriptionList.map((desc, i) => {
        return (
          <Box display="flex" mt={2} alignItems="center" className={classes.additionalFieldFormContainer}>
            <TextField
              variant="outlined"
              size="small"
              id="input-with-icon-grid"
              name="description_field"
              label="Field Name"
              value={desc.description_field}
              required
              onChange={(e) => handleInputChange(e, i)}
            />
            <Box mx={1}>
              <TextField
                variant="outlined"
                size="small"
                id="input-with-icon-grid"
                name="description"
                label="Field Description"
                required
                value={desc.description}
                onChange={(e) => handleInputChange(e, i)}
              />
            </Box>
            <Box ml={1}>
              <ButtonGroup
                aria-label="small outlined button group">
                {descriptionList.length !== 1 && (
                  <Button
                    aria-label="delete"
                    onClick={() => handleRemoveClick(i)}>
                    <DeleteIcon />
                  </Button>
                )}
                {descriptionList.length - 1 === i && (
                  <Button
                    aria-label="delete"
                    onClick={handleAddClick}>
                    <AddBoxIcon />
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </Box>
        );
      })}
    </div>
  )
}

export default AdditionalDescriptionForm
