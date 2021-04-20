import React, { useEffect } from 'react';
import { getCollection } from 'app/hooks';
import { docData } from 'rxfire/firestore';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

interface IProps {
  id: string;
}

const SwitchOnlineMode: React.FC<IProps> = ({ id }) => {
  const [state, setState] = React.useState(false);

  useEffect(() => {
    const user$ = getCollection('users').doc(id);
    docData(user$)
      .subscribe((data: any) => {
        if (data) {
          setState(data.isOnline);
        }
      })
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
    getCollection('users').doc(id).update({
      isOnline: !state
    })
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch checked={state} onChange={handleChange} name="checkedB" />}
        label={state ? 'Online' : 'Offline'}
      />
    </FormGroup>
  );
}

export default SwitchOnlineMode