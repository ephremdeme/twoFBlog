import React, { useState } from 'react'
import { Box, Button, ButtonGroup, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { v4 as uuidv4 } from 'uuid';

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
      borderBottom: theme.palette.type == 'dark' ? "1px solid #444" : "1px solid #ddd"
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

const AdditionalDescriptionForm = ({ onBranchChange }: any) => {
  const classes = useStyles();
  const [branchList, setDescriptionList] = useState([
    { branch_name: '', branch_address: '', branch_phone: '' }
  ]);

  const handleInputChange = (
    e: React.SyntheticEvent<EventTarget>,
    index: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;
    const list: any = [...branchList];

    if (name) {
      list[index][name] = value;
    }
    setDescriptionList(list);
    onBranchChange(branchList);
  };
  const handleRemoveClick = (index: number) => {
    const list = [...branchList];
    list.splice(index, 1);
    setDescriptionList(list);
    onBranchChange(branchList);
  };

  const handleAddClick = () => {
    const newBranchList = [
      ...branchList,
      { id: uuidv4(), branch_name: '', branch_address: '', branch_phone: '' }
    ]
    setDescriptionList(newBranchList);
    onBranchChange(newBranchList);
  };

  return (
    <div>
      <Box mt={2}>
        {!branchList.length && (
          <Button
            variant="outlined"
            aria-label="delete"
            onClick={handleAddClick}>
            Add new branch
          </Button>
        )}
      </Box>
      {branchList.map((desc, i) => {
        return (
          <Box key={i} mt={2} alignItems="center" className={classes.additionalFieldFormContainer}>
            <Box mx={1} mb={2}>
              <Box>
                <TextField
                  variant="outlined"
                  size="small"
                  id="input-with-icon-grid"
                  name="branch_name"
                  label="Branch Name"
                  value={desc.branch_name}
                  required
                  className={classes.inputField}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  id="input-with-icon-grid"
                  name="branch_address"
                  label="Branch Phone Number"
                  required
                  className={classes.inputField}
                  value={desc.branch_address}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  id="input-with-icon-grid"
                  name="branch_phone"
                  label="Branch Adress"
                  required
                  className={classes.inputField}
                  value={desc.branch_phone}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Box>
              <Box mx={2}>
                <ButtonGroup
                  aria-label="small outlined button group">
                  <Button
                    size="small"
                    variant="outlined"
                    aria-label="delete"
                    onClick={() => handleRemoveClick(i)}>
                    <DeleteIcon />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    aria-label="delete"
                    onClick={handleAddClick}>
                    <AddBoxIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        );
      })}
    </div>
  )
}

export default AdditionalDescriptionForm
