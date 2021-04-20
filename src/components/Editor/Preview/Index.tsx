import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { 
  DialogContent, 
  DialogContentText, 
  Paper, 
  Tabs, 
  Tab, 
  DialogActions, 
  Box 
} from '@material-ui/core';

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

import DesktopPreview from './Desktop/Index';
import MobilePreview from './Mobile/Index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// interface IPreviewProps {
//   editor: any,
// }

export default function Index(props: any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [arraydata, setArraydata] = React.useState<any>(null);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const {setOpen, open} = props

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        fullScreen={true}
      >
        <DialogContent>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
              centered
            >
                <Tab icon={<DesktopWindowsIcon />}/>
                <Tab icon={<SmartphoneIcon />}/>
                <Button color="primary" style={{ textTransform:'none',position: 'absolute',top: 5,right: 0}} onClick={handleClose}><CloseIcon/></Button>
            </Tabs>

          </Paper>

          <TabPanel value={value} index={0}>
              <DesktopPreview content={props.editorContent}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <MobilePreview content={props.editorContent}/>
          </TabPanel>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
