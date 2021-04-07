import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  Box,
  createStyles,
  Divider,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slider,
  Theme,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import BranchsForm from './BranchsForm';

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
    formContainer: {
      width: "80%",
      margin: "auto"
    }
  })
);

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.uid);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [category, setCategory] = useState('money');
  const [condition, setCondition] = React.useState('');

  const handleConditionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCondition(event.target.value as string);
  };

  const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();

  const onSubmit = async (data: any) => {
    // const descriptions = descriptionList.map(
    // 	(desc: any) => desc.description_field + '<:>' + desc.description
    // );

    console.log('The Data: ', data);
    console.log('file: ', file);

    const dataUp = {
      ...data,
      uid: userID,
      // additionalDescription: descriptions,
      condition: condition,
    };

    // dispatch(
    // postProduct({
    // 	file: file,
    // 	data: dataUp,
    // })
    // );
    setTimeout(() => history.push('/products/list/admin'), 1500);
  };

  // image file
  const handleChange = (e: any) => {
    let selected = e.target.files[0];
    setFile(selected);
  };

  const onDescriptionChange = (desc: any) => {
    console.log("AAAAAAAAAAAAAAAAAa: ", desc)
  }

  const masks = [{
    value: 0,
    label: '0',
  }, {
    value: 6,
    label: '6',
  }, {
    value: 12,
    label: '12',
  },
  {
    value: 18,
    label: '18',
  }, {
    value: 24,
    label: '24',
  }]
  const [value, setValue] = React.useState<number[]>([7, 17]);
  const handleChangeSlider = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onBranchAdded = (desc: any) => {
    console.log("AAAAAAAAAAAAAAAAAa: ", desc)
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '1.3rem' }} className={classes.formContainer} >
      <Box fontSize="1.3rem" fontWeight={700}>
        Create a new shope
			</Box>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              as={
                <TextField
                  variant="outlined"
                  className={classes.field}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Shope Name"
                  color="primary"
                  size="small"
                  fullWidth
                  required
                  error={titleError}
                />
              }
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              as={
                <TextField
                  variant="outlined"
                  type="tel"
                  className={classes.field}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Shope Phone Number"
                  color="primary"
                  size="small"
                  fullWidth
                  required
                  error={titleError}
                />
              }
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              as={
                <TextField
                  variant="outlined"
                  type="email"
                  className={classes.field}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Shope Email Adress..."
                  color="primary"
                  size="small"
                  fullWidth
                  required
                  error={titleError}
                />
              }
            />

            <Box mb={2}>
              <Button variant="outlined" size="small" component="label">
                Upload Product Shope Image
                <input
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>
            </Box>
          </Grid>

          <Grid item sm={12} md={6}>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              as={
                <TextField
                  variant="outlined"
                  className={classes.field}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Shope Location..."
                  color="primary"
                  size="small"
                  fullWidth
                  required
                  error={titleError}
                />
              }
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              as={
                <TextField
                  variant="outlined"
                  className={classes.field}
                  onChange={(e) => setDetails(e.target.value)}
                  label="Description"
                  color="primary"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  error={detailsError}
                />
              }
            />
            <Typography id="range-slider" gutterBottom>
              Working Hours
            </Typography>
            <Slider
              max={24}
              min={0}
              value={value}
              marks={masks}
              onChange={handleChangeSlider}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={() => `${value} Hr`}
            />
          </Grid>
        </Grid>

        <Divider />
        <Box my={4}></Box>
        <Box fontSize="1rem" fontWeight={600}>Add Shop Branchs</Box>
        <BranchsForm descriptions={onBranchAdded} />

        <Button
          disableElevation
          type="submit"
          color="primary"
          variant="contained"
          style={{
            marginTop: "3rem",
            maxWidth: "300px",
            width: '80%'
          }}
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
				</Button>
        <Box mt={10}></Box>
      </form>
    </Container >
  );
}
