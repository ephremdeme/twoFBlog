import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getCollection } from 'app/hooks';
import { collectionData } from 'rxfire/firestore';
import { Box, CircularProgress } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: 300,
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectMembers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [members, setMembers] = React.useState<any[]>([]);

  useEffect(() => {
    setLoading(true)
    collectionData(getCollection('users'))
      .subscribe((users) => {
        setLoading(false)
        console.log("USERS: ", users)
        setMembers(users);
      })
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setMembers([...members, event.target.value]);
  };

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setMembers(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Add members to shope</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <Box m={3} fontWeight={600} fontSize="1rem">Select members for branch</Box>
        <DialogContent>
          <form className={classes.container}>
            <Box display="flex" width="100%" alignItems="center" justifyContent="center">
              {loading ? (
                <Box>
                  <Box width="100%" display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                  <Box>Fetching Users...</Box>
                </Box>
              ) : (
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={members}
                    onChange={handleChangeMultiple}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} className={classes.chip} />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {members.map((member) => (
                      <MenuItem key={member.uid} value={member.email} >
                        {member.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )
              }
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}